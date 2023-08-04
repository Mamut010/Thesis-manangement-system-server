import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { INJECTION_TOKENS } from '../../core/constants/injection-tokens';
import { 
    JwtAccessContextDto, 
    JwtAccessPayloadDto, 
    JwtRefreshContextDto, 
    JwtRefreshPayloadDto, 
    UserCreateRequestDto 
} from '../../shared/dtos';
import { 
    AuthServiceInterface, 
    HashServiceInterface, 
    JwtServiceInterface
} from '../interfaces';
import { LoginRequest } from '../../contracts/requests/login.request';
import { PrismaClient } from '@prisma/client';
import { UnauthorizedError } from '../../contracts/errors/unauthorized.error';
import { UnexpectedError } from '../../contracts/errors/unexpected.error';
import { SignUpRequest } from '../../contracts/requests/sign-up.request';
import { AuthenticationError } from '../../contracts/errors/authentication.error';
import { Role, RefreshToken } from '../../core/models';
import { plainToInstanceExactMatch } from '../../utils/class-transformer-helpers';
import { JwtExtractorInterface } from '../utils/jwt-extractors';
import { JwtCookieHandlerInterface } from '../utils/jwt-cookie-handlers';
import { AUTH_ERROR_MESSAGES } from '../../core/constants/auth-error-messages';
import { 
    UserRepoInterface, 
    RefreshTokenRepoInterface 
} from '../../shared/interfaces';
import { NOT_FOUND_ERROR_MESSAGES } from '../../core/constants/not-found-error-message';
import { StringResponse } from '../../contracts/responses/string.response';
import { StringArrayResponse } from '../../contracts/responses/string-array.response';

@injectable()
export class AuthService implements AuthServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.UserRepo) private userRepo: UserRepoInterface,
        @inject(INJECTION_TOKENS.HashService) private hashService: HashServiceInterface,
        @inject(INJECTION_TOKENS.JwtService) private jwtService: JwtServiceInterface,
        @inject(INJECTION_TOKENS.JwtExtractor) private jwtExtractor: JwtExtractorInterface,
        @inject(INJECTION_TOKENS.JwtCookieHandler) private jwtCookieHandler: JwtCookieHandlerInterface,
        @inject(INJECTION_TOKENS.RefreshTokenRepo) private refreshTokenRepo: RefreshTokenRepoInterface) {

    }

    async signUp(signUpRequest: SignUpRequest): Promise<void> {
        if (await this.prisma.user.findUnique({ where: { userId: signUpRequest.id }})) {
            throw new AuthenticationError(AUTH_ERROR_MESSAGES.UserIdAlreadyExists);
        }
        else if (await this.prisma.user.findUnique({ where: { username: signUpRequest.username }})) {
            throw new AuthenticationError(AUTH_ERROR_MESSAGES.UsernamAlreadyExists);
        }

        const role = await this.prisma.role.findUnique({ where: { name: signUpRequest.roles[0] }});

        if (!role) {
            throw new UnexpectedError(NOT_FOUND_ERROR_MESSAGES.RoleNotFound);
        }

        const userCreatingRequest = new UserCreateRequestDto();
        userCreatingRequest.userId = signUpRequest.id;
        userCreatingRequest.username = signUpRequest.username;
        userCreatingRequest.password = await this.hashService.hash(signUpRequest.password);
        userCreatingRequest.email = signUpRequest.email;
        userCreatingRequest.role = plainToInstanceExactMatch(Role, role);

        await this.userRepo.create(userCreatingRequest);
    }

    async login(loginRequest: LoginRequest, response: Response): Promise<StringResponse> {
        const user = await this.prisma.user.findUnique({
            where: {
                username: loginRequest.username
            },
            include: {
                role: true
            }
        });

        if (!user ||
            !(await this.hashService.verifyHash(loginRequest.password, user.password))) {
            throw new UnauthorizedError(AUTH_ERROR_MESSAGES.InvalidLoginCredentials);
        }

        const jwtAccessContext = plainToInstanceExactMatch(JwtAccessContextDto, user);
        jwtAccessContext.roles = [user.role.name];
        const jwtRefreshContext = plainToInstanceExactMatch(JwtRefreshContextDto, user);

        const { accessToken, refreshToken } = this.jwtService.generateTokens(jwtAccessContext, jwtRefreshContext);

        await this.refreshTokenRepo.deleteAll(user.userId);
        await this.refreshTokenRepo.create(plainToInstanceExactMatch(RefreshToken, {
            userId: user.userId, 
            token: await this.hashService.hash(refreshToken), 
            exp: this.jwtService.getTokenExp(refreshToken),
        }));
        await this.jwtCookieHandler.attachRefreshTokenToCookie(response, refreshToken);

        return new StringResponse(accessToken);
    }

    async logout(request: Request, response: Response): Promise<void> {
        const payload = await this.verifyJwtTokenInRequest(request);
        if (!payload) {
            throw new UnauthorizedError(AUTH_ERROR_MESSAGES.InvalidAccessToken);
        }

        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.context.id,
                userId: payload.context.userId,
                username: payload.context.username,
                role: {
                    name: {
                        in: payload.context.roles
                    }
                }
            }
        });
        if (!user) {
            throw new UnauthorizedError(AUTH_ERROR_MESSAGES.InvalidEmbeddedCredentials);
        }

        await this.refreshTokenRepo.deleteAll(payload.context.userId);
        await this.jwtCookieHandler.detachRefreshTokenFromCookie(response);
    }

    async getRoles(request: Request): Promise<StringArrayResponse> {
        const payload = await this.verifyJwtTokenInRequest(request);
        if (!payload) {
            throw new UnauthorizedError(AUTH_ERROR_MESSAGES.InvalidAccessToken);
        }

        return new StringArrayResponse(payload.context.roles);
    }

    async issueAccessToken(request: Request, response: Response): Promise<StringResponse> {
        const refreshToken = await this.jwtCookieHandler.extractRefreshTokenFromCookie(request);
        if (!refreshToken) {
            throw new UnauthorizedError(AUTH_ERROR_MESSAGES.RefreshTokenNotFound);
        }

        let payload: JwtRefreshPayloadDto;
        try {
            // verify the token payload
            payload = this.jwtService.verifyRefreshToken(refreshToken);
            
            // verify if the user really associates with the token in the DB and the token is really valid
            const user = await this.prisma.user.findUnique({
                where: {
                    id: payload.context.id,
                    userId: payload.context.userId,
                },
                include: {
                    refreshToken: true,
                    role: true,
                }
            });

            if (!user) {
                throw new AuthenticationError(AUTH_ERROR_MESSAGES.InvalidEmbeddedCredentials);
            }
            else if (!user.refreshToken ||
                !(await this.hashService.verifyHash(refreshToken, user.refreshToken.token))) {
                throw new AuthenticationError(AUTH_ERROR_MESSAGES.InvalidRefreshToken);
            }
    
            // If everything is valid, issue new access token
            const jwtAccessContext = plainToInstanceExactMatch(JwtAccessContextDto, user);
            jwtAccessContext.roles = [user.role.name];
            return new StringResponse(this.jwtService.generateAccessToken(jwtAccessContext));
        }
        catch (err) {
            // Revoke refresh token if it is expired
            if (this.jwtService.getTokenExp(refreshToken) <= new Date()) {
                await this.refreshTokenRepo.deleteAll(this.jwtService.decodeRefreshToken(refreshToken).context.userId);
                await this.jwtCookieHandler.detachRefreshTokenFromCookie(response);
            }
            throw err;
        }
    }

    async verifyJwtTokenInRequest(request: Request): Promise<JwtAccessPayloadDto | undefined> {
        try {
            const accessToken = await this.jwtExtractor.extract(request);

            if (!accessToken) {
                return undefined;
            }
            
            return this.jwtService.verifyAccessToken(accessToken);
        }
        catch {
            return undefined;
        }
    }
}