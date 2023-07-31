"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNEXPECTED_ERROR_MESSAGES = void 0;
const object_helpers_1 = require("../../utils/object-helpers");
const UNEXPECTED_ERROR_MESSAGES = {
    RefreshTokenCreationFailed: 'Unable to create refresh token',
    RefreshTokenDeleteAllFailed: 'Unable to delete all associated refresh tokens',
    UserCreationFailed: 'Unable to create new user',
};
exports.UNEXPECTED_ERROR_MESSAGES = UNEXPECTED_ERROR_MESSAGES;
(0, object_helpers_1.makeImmutable)(UNEXPECTED_ERROR_MESSAGES);
//# sourceMappingURL=unexpected-error-messages.js.map