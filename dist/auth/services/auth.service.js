"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const injection_tokens_1 = require("../../core/constants/injection-tokens");
const dtos_1 = require("../../shared/dtos");
const client_1 = require("@prisma/client");
const unauthorized_error_1 = require("../../contracts/errors/unauthorized.error");
const unexpected_error_1 = require("../../contracts/errors/unexpected.error");
const authentication_error_1 = require("../../contracts/errors/authentication.error");
const models_1 = require("../../core/models");
const class_transformer_helpers_1 = require("../../utils/class-transformer-helpers");
const auth_error_messages_1 = require("../../core/constants/auth-error-messages");
const not_found_error_message_1 = require("../../core/constants/not-found-error-message");
const string_response_1 = require("../../contracts/responses/string.response");
const string_array_response_1 = require("../../contracts/responses/string-array.response");
let AuthService = exports.AuthService = class AuthService {
    constructor(prisma, userRepo, hashService, jwtService, jwtExtractor, jwtCookieHandler, refreshTokenRepo) {
        this.prisma = prisma;
        this.userRepo = userRepo;
        this.hashService = hashService;
        this.jwtService = jwtService;
        this.jwtExtractor = jwtExtractor;
        this.jwtCookieHandler = jwtCookieHandler;
        this.refreshTokenRepo = refreshTokenRepo;
    }
    async signUp(signUpRequest) {
        if (await this.prisma.user.findUnique({ where: { userId: signUpRequest.id } })) {
            throw new authentication_error_1.AuthenticationError(auth_error_messages_1.AUTH_ERROR_MESSAGES.UserIdAlreadyExists);
        }
        else if (await this.prisma.user.findUnique({ where: { username: signUpRequest.username } })) {
            throw new authentication_error_1.AuthenticationError(auth_error_messages_1.AUTH_ERROR_MESSAGES.UsernamAlreadyExists);
        }
        const role = await this.prisma.role.findUnique({ where: { name: signUpRequest.roles[0] } });
        if (!role) {
            throw new unexpected_error_1.UnexpectedError(not_found_error_message_1.NOT_FOUND_ERROR_MESSAGES.RoleNotFound);
        }
        const userCreatingRequest = new dtos_1.UserCreatingRequestDto();
        userCreatingRequest.userId = signUpRequest.id;
        userCreatingRequest.username = signUpRequest.username;
        userCreatingRequest.password = await this.hashService.hash(signUpRequest.password);
        userCreatingRequest.email = signUpRequest.email;
        userCreatingRequest.role = (0, class_transformer_helpers_1.plainToInstanceExactMatch)(models_1.Role, role);
        await this.userRepo.create(userCreatingRequest);
    }
    async login(loginRequest, response) {
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
            throw new unauthorized_error_1.UnauthorizedError(auth_error_messages_1.AUTH_ERROR_MESSAGES.InvalidLoginCredentials);
        }
        const jwtAccessContext = (0, class_transformer_helpers_1.plainToInstanceExactMatch)(dtos_1.JwtAccessContextDto, user);
        jwtAccessContext.roles = [user.role.name];
        const jwtRefreshContext = (0, class_transformer_helpers_1.plainToInstanceExactMatch)(dtos_1.JwtRefreshContextDto, user);
        const { accessToken, refreshToken } = this.jwtService.generateTokens(jwtAccessContext, jwtRefreshContext);
        await this.refreshTokenRepo.deleteAll(user.userId);
        await this.refreshTokenRepo.create((0, class_transformer_helpers_1.plainToInstanceExactMatch)(models_1.RefreshToken, {
            userId: user.userId,
            token: await this.hashService.hash(refreshToken),
            exp: this.jwtService.getTokenExp(refreshToken),
        }));
        await this.jwtCookieHandler.attachRefreshTokenToCookie(response, refreshToken);
        return new string_response_1.StringResponse(accessToken);
    }
    async logout(request, response) {
        const payload = await this.verifyJwtTokenInRequest(request);
        if (!payload) {
            throw new unauthorized_error_1.UnauthorizedError(auth_error_messages_1.AUTH_ERROR_MESSAGES.InvalidAccessToken);
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
            throw new unauthorized_error_1.UnauthorizedError(auth_error_messages_1.AUTH_ERROR_MESSAGES.InvalidEmbeddedCredentials);
        }
        await this.refreshTokenRepo.deleteAll(payload.context.userId);
        await this.jwtCookieHandler.detachRefreshTokenFromCookie(response);
    }
    async getRoles(request) {
        const payload = await this.verifyJwtTokenInRequest(request);
        if (!payload) {
            throw new unauthorized_error_1.UnauthorizedError(auth_error_messages_1.AUTH_ERROR_MESSAGES.InvalidAccessToken);
        }
        return new string_array_response_1.StringArrayResponse(payload.context.roles);
    }
    async issueAccessToken(request, response) {
        const refreshToken = await this.jwtCookieHandler.extractRefreshTokenFromCookie(request);
        if (!refreshToken) {
            throw new unauthorized_error_1.UnauthorizedError(auth_error_messages_1.AUTH_ERROR_MESSAGES.RefreshTokenNotFound);
        }
        let payload;
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
                throw new authentication_error_1.AuthenticationError(auth_error_messages_1.AUTH_ERROR_MESSAGES.InvalidEmbeddedCredentials);
            }
            else if (!user.refreshToken ||
                !(await this.hashService.verifyHash(refreshToken, user.refreshToken.token))) {
                throw new authentication_error_1.AuthenticationError(auth_error_messages_1.AUTH_ERROR_MESSAGES.InvalidRefreshToken);
            }
            // If everything is valid, issue new access token
            const jwtAccessContext = (0, class_transformer_helpers_1.plainToInstanceExactMatch)(dtos_1.JwtAccessContextDto, user);
            jwtAccessContext.roles = [user.role.name];
            return new string_response_1.StringResponse(this.jwtService.generateAccessToken(jwtAccessContext));
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
    async verifyJwtTokenInRequest(request) {
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
};
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(injection_tokens_1.INJECTION_TOKENS.Prisma)),
    tslib_1.__param(1, (0, inversify_1.inject)(injection_tokens_1.INJECTION_TOKENS.UserRepo)),
    tslib_1.__param(2, (0, inversify_1.inject)(injection_tokens_1.INJECTION_TOKENS.HashService)),
    tslib_1.__param(3, (0, inversify_1.inject)(injection_tokens_1.INJECTION_TOKENS.JwtService)),
    tslib_1.__param(4, (0, inversify_1.inject)(injection_tokens_1.INJECTION_TOKENS.JwtExtractor)),
    tslib_1.__param(5, (0, inversify_1.inject)(injection_tokens_1.INJECTION_TOKENS.JwtCookieHandler)),
    tslib_1.__param(6, (0, inversify_1.inject)(injection_tokens_1.INJECTION_TOKENS.RefreshTokenRepo)),
    tslib_1.__metadata("design:paramtypes", [client_1.PrismaClient, Object, Object, Object, Object, Object, Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map