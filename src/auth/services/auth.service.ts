import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { INJECTION_TOKENS } from '../../core/constants/injection-tokens';
import { 
    JwtAccessContextDto, 
    JwtAccessPayloadDto, 
    JwtRefreshContextDto, 
    JwtRefreshPayloadDto,
    UserInfoDto,
} from '../../shared/dtos';
import { AuthServiceInterface } from '../interfaces';
import { UnauthorizedError } from '../../contracts/errors/unauthorized.error';
import { AuthenticationError } from '../../contracts/errors/authentication.error';
import { JwtCookieHandlerInterface } from '../utils/jwt-cookie-handlers';
import { ERROR_MESSAGES } from '../../contracts/constants/error-messages';
import {
    JwtServiceInterface,
    CryptoServiceInterface,
    JwtExtractorServiceInterface,
    MapperServiceInterface
} from '../../shared/interfaces';
import { StringResponse, StringArrayResponse } from '../../contracts/responses';
import { RefreshTokenRepoInterface, RoleRepoInterface, UserRepoInterface } from '../../dal/interfaces';
import { 
    LoginRequest,
    SignUpRequest,
    UserCreateRequest, 
    UsersQueryRequest
} from '../../contracts/requests';
import { StringFilter } from '../../lib/query';
import { makeArray, singleOrDefault } from '../../utils/array-helpers';
import { NotFoundError } from '../../contracts/errors/not-found.error';
import { Role } from '../../core/constants/roles';
import { ForbiddenError } from '../../contracts/errors/forbidden.error';
import { AuthorizedUser } from '../../core/auth-checkers';

@injectable()
export class AuthService implements AuthServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.UserRepo) private userRepo: UserRepoInterface,
        @inject(INJECTION_TOKENS.RoleRepo) private roleRepo: RoleRepoInterface,
        @inject(INJECTION_TOKENS.RefreshTokenRepo) private refreshTokenRepo: RefreshTokenRepoInterface,
        @inject(INJECTION_TOKENS.CryptoService) private cryptoService: CryptoServiceInterface,
        @inject(INJECTION_TOKENS.JwtService) private jwtService: JwtServiceInterface,
        @inject(INJECTION_TOKENS.JwtExtractor) private jwtExtractor: JwtExtractorServiceInterface,
        @inject(INJECTION_TOKENS.JwtCookieHandler) private jwtCookieHandler: JwtCookieHandlerInterface,
        @inject(INJECTION_TOKENS.MapperService) private mapper: MapperServiceInterface) {

    }

    async signup(signUpRequest: SignUpRequest): Promise<UserInfoDto> {
        if (await this.userRepo.findOneById(signUpRequest.userId)) {
            throw new AuthenticationError(ERROR_MESSAGES.Auth.UserIdAlreadyExists);
        }
        else if (await this.getUserByUsername(signUpRequest.username)) {
            throw new AuthenticationError(ERROR_MESSAGES.Auth.UsernameAlreadyExists);
        }

        const role = await this.roleRepo.findOneById(signUpRequest.roleId);
        if (!role) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.RoleNotFound);
        }
        else if (role.name === Role.Admin) {
            throw new ForbiddenError(ERROR_MESSAGES.Forbidden.UnpermittedRole);
        }

        const userCreatingRequest = new UserCreateRequest();
        userCreatingRequest.userId = signUpRequest.userId;
        userCreatingRequest.username = signUpRequest.username;
        userCreatingRequest.password = await this.cryptoService.hash(signUpRequest.password);
        userCreatingRequest.roleName = role.name;
        userCreatingRequest.email = signUpRequest.email;

        const record = await this.userRepo.create(userCreatingRequest);
        return this.mapper.map(UserInfoDto, record);
    }

    async login(response: Response, loginRequest: LoginRequest): Promise<StringResponse> {
        const user = await this.getUserByUsername(loginRequest.username);
        if (!user ||
            !(await this.cryptoService.verifyHash(loginRequest.password, user.password))) {
            throw new UnauthorizedError(ERROR_MESSAGES.Auth.InvalidLoginCredentials);
        }

        const jwtAccessContext = this.mapper.map(JwtAccessContextDto, user);
        jwtAccessContext.roles = [user.roleName];
        const jwtRefreshContext = this.mapper.map(JwtRefreshContextDto, user);

        const { accessToken, refreshToken } = this.jwtService.generateTokens(jwtAccessContext, jwtRefreshContext);
        const hashedRefreshToken = await this.cryptoService.hash(refreshToken);

        await this.refreshTokenRepo.upsert({
            userId: user.userId,
            create: { token: hashedRefreshToken },
            update: { token: hashedRefreshToken },
        });
        await this.jwtCookieHandler.attachRefreshTokenToCookie(response, refreshToken);

        return new StringResponse(accessToken);
    }

    async logout(user: AuthorizedUser, response: Response): Promise<void> {
        await this.refreshTokenRepo.deleteByUserId(user.userId);
        await this.jwtCookieHandler.detachRefreshTokenFromCookie(response);
    }

    getRoles(user: AuthorizedUser): StringArrayResponse {
        return new StringArrayResponse(user.roles);
    }

    async issueAccessToken(request: Request, response: Response): Promise<StringResponse> {
        const refreshToken = await this.jwtCookieHandler.extractRefreshTokenFromCookie(request);
        if (!refreshToken) {
            throw new UnauthorizedError(ERROR_MESSAGES.Auth.RefreshTokenNotFound);
        }

        let payload: JwtRefreshPayloadDto;
        try {
            // verify the token payload
            payload = this.jwtService.verifyRefreshToken(refreshToken);
            
            // verify the token against records in the DB
            const user = await this.userRepo.findOneById(payload.context.userId);
            if (!user) {
                throw new AuthenticationError(ERROR_MESSAGES.Auth.InvalidEmbeddedCredentials);
            }

            const storedToken = (await this.refreshTokenRepo.findOneByUserId(payload.context.userId))?.token;
            if (!storedToken ||
                !(await this.cryptoService.verifyHash(refreshToken, storedToken))) {
                throw new AuthenticationError(ERROR_MESSAGES.Auth.InvalidRefreshToken);
            }
    
            // If everything is valid, issue new access token
            const jwtAccessContext = this.mapper.map(JwtAccessContextDto, user);
            jwtAccessContext.roles = [user.roleName];
            return new StringResponse(this.jwtService.generateAccessToken(jwtAccessContext));
        }
        catch (err) {
            // Revoke refresh token if it is expired
            if (this.jwtService.getTokenExp(refreshToken) <= new Date()) {
                await this.refreshTokenRepo.deleteByUserId(this.jwtService.decodeRefreshToken(refreshToken).context.userId);
                await this.jwtCookieHandler.detachRefreshTokenFromCookie(response);
            }
            throw err;
        }
    }

    async verifyJwtTokenInRequest(request: Request): Promise<JwtAccessPayloadDto | undefined> {
        try {
            const authHeader = request.headers.authorization;
            if (!authHeader) {
                return undefined;
            }

            const accessToken = await this.jwtExtractor.extract(authHeader);
            if (!accessToken) {
                return undefined;
            }
            
            return this.jwtService.verifyAccessToken(accessToken);
        }
        catch {
            return undefined;
        }
    }

    private async getUserByUsername(username: string) {
        const usernameFilter = new StringFilter();
        usernameFilter.value = username;
        usernameFilter.operator = 'equals';
        const queryRequest = new UsersQueryRequest();
        queryRequest.usernameFilter = makeArray(usernameFilter);
        
        const user = await this.userRepo.query(queryRequest);
        return singleOrDefault(user.content);
    }
}