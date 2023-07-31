"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_ERROR_MESSAGES = void 0;
const object_helpers_1 = require("../../utils/object-helpers");
const AUTH_ERROR_MESSAGES = {
    InvalidLoginCredentials: 'Wrong username or password',
    InvalidEmbeddedCredentials: 'Invalid embedded credentials',
    InvalidRefreshToken: 'Invalid refresh token',
    InvalidAccessToken: 'Invalid access token',
    UserIdAlreadyExists: 'User ID already exists',
    UsernamAlreadyExists: 'Username already exists',
    RefreshTokenNotFound: 'Refresh token not found',
};
exports.AUTH_ERROR_MESSAGES = AUTH_ERROR_MESSAGES;
(0, object_helpers_1.makeImmutable)(AUTH_ERROR_MESSAGES);
//# sourceMappingURL=auth-error-messages.js.map