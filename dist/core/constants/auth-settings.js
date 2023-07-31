"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_SETTINGS = void 0;
const env_1 = require("../../env");
const object_helpers_1 = require("../../utils/object-helpers");
const AUTH_SETTINGS = {
    Jwt: {
        AccessTokenSecret: env_1.env.secrets.accessToken,
        RefreshTokenSecret: env_1.env.secrets.refreshToken,
        RefreshTokenCookie: 'jwt-refresh',
        AccessTokenTtl: '10m',
        RefreshTokenTtl: '30d',
    },
    Hash: {
        SaltRounds: 10,
    },
    Helmet: {
        HstsMaxAge: 31536000
    }
};
exports.AUTH_SETTINGS = AUTH_SETTINGS;
(0, object_helpers_1.makeImmutable)(AUTH_SETTINGS);
//# sourceMappingURL=auth-settings.js.map