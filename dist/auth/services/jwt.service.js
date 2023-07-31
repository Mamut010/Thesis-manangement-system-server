"use strict";
var JwtService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const tslib_1 = require("tslib");
const jwt = tslib_1.__importStar(require("jsonwebtoken"));
const inversify_1 = require("inversify");
const class_transformer_1 = require("class-transformer");
const route_1 = require("../../utils/route");
const auth_settings_1 = require("../../core/constants/auth-settings");
const jwt_token_types_1 = require("../../core/enums/jwt-token-types");
const dtos_1 = require("../../shared/dtos");
const class_transformer_helpers_1 = require("../../utils/class-transformer-helpers");
let JwtService = exports.JwtService = JwtService_1 = class JwtService {
    getSettingsByTokenType(tokenType) {
        if (tokenType === jwt_token_types_1.JwtTokenTypes.accessToken) {
            return {
                secret: auth_settings_1.AUTH_SETTINGS.Jwt.AccessTokenSecret,
                expiresIn: auth_settings_1.AUTH_SETTINGS.Jwt.AccessTokenTtl,
            };
        }
        else {
            return {
                secret: auth_settings_1.AUTH_SETTINGS.Jwt.RefreshTokenSecret,
                expiresIn: auth_settings_1.AUTH_SETTINGS.Jwt.RefreshTokenTtl,
            };
        }
    }
    generateAccessToken(context) {
        const payload = new dtos_1.JwtAccessPayloadDto();
        payload.context = context;
        const settings = this.getSettingsByTokenType(jwt_token_types_1.JwtTokenTypes.accessToken);
        const token = jwt.sign((0, class_transformer_helpers_1.instanceToPlainSkipUnset)(payload), settings.secret, {
            expiresIn: settings.expiresIn,
            ...JwtService_1.DEFAULT_SIGN_OPTIONS,
        });
        return token;
    }
    generateRefreshToken(context) {
        const payload = new dtos_1.JwtRefreshPayloadDto();
        payload.context = context;
        const settings = this.getSettingsByTokenType(jwt_token_types_1.JwtTokenTypes.refreshToken);
        const token = jwt.sign((0, class_transformer_helpers_1.instanceToPlainSkipUnset)(payload), settings.secret, {
            expiresIn: settings.expiresIn,
            ...JwtService_1.DEFAULT_SIGN_OPTIONS,
        });
        return token;
    }
    generateTokens(accessContext, refreshContext) {
        return {
            accessToken: this.generateAccessToken(accessContext),
            refreshToken: this.generateRefreshToken(refreshContext),
        };
    }
    verifyAccessToken(token) {
        const secret = this.getSettingsByTokenType(jwt_token_types_1.JwtTokenTypes.accessToken).secret;
        return (0, class_transformer_1.plainToInstance)(dtos_1.JwtAccessPayloadDto, jwt.verify(token, secret, JwtService_1.DEFAULT_SIGN_OPTIONS));
    }
    verifyRefreshToken(token) {
        const secret = this.getSettingsByTokenType(jwt_token_types_1.JwtTokenTypes.refreshToken).secret;
        return (0, class_transformer_1.plainToInstance)(dtos_1.JwtRefreshPayloadDto, jwt.verify(token, secret, JwtService_1.DEFAULT_SIGN_OPTIONS));
    }
    decodeAccessToken(token) {
        return (0, class_transformer_1.plainToInstance)(dtos_1.JwtAccessPayloadDto, jwt.decode(token));
    }
    decodeRefreshToken(token) {
        return (0, class_transformer_1.plainToInstance)(dtos_1.JwtRefreshPayloadDto, jwt.decode(token));
    }
    getTokenExp(token) {
        const exp = jwt.decode(token).exp ?? 0;
        return new Date(exp * 1000);
    }
};
JwtService.DEFAULT_SIGN_OPTIONS = {
    issuer: (0, route_1.route)('auth'),
    audience: (0, route_1.route)('api')
};
exports.JwtService = JwtService = JwtService_1 = tslib_1.__decorate([
    (0, inversify_1.injectable)()
], JwtService);
//# sourceMappingURL=jwt.service.js.map