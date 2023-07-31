"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtCookieHandler = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const auth_settings_1 = require("../../../core/constants/auth-settings");
const injection_tokens_1 = require("../../../core/constants/injection-tokens");
let JwtCookieHandler = exports.JwtCookieHandler = class JwtCookieHandler {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    attachRefreshTokenToCookie(response, token) {
        response.cookie(auth_settings_1.AUTH_SETTINGS.Jwt.RefreshTokenCookie, token, {
            httpOnly: true,
            expires: this.jwtService.getTokenExp(token)
        });
    }
    detachRefreshTokenFromCookie(response) {
        response.clearCookie(auth_settings_1.AUTH_SETTINGS.Jwt.RefreshTokenCookie, {
            httpOnly: true
        });
    }
    extractRefreshTokenFromCookie(request) {
        const cookies = request.cookies;
        return cookies[auth_settings_1.AUTH_SETTINGS.Jwt.RefreshTokenCookie];
    }
};
exports.JwtCookieHandler = JwtCookieHandler = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(injection_tokens_1.INJECTION_TOKENS.JwtService)),
    tslib_1.__metadata("design:paramtypes", [Object])
], JwtCookieHandler);
//# sourceMappingURL=jwt-cookie-handler.js.map