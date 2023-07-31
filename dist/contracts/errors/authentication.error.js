"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationError = void 0;
const routing_controllers_1 = require("routing-controllers");
const http_codes_1 = require("../../core/enums/http-codes");
class AuthenticationError extends routing_controllers_1.HttpError {
    constructor(message = 'An authentication error has occured') {
        super(http_codes_1.HttpCodes.Conflict, message);
    }
}
exports.AuthenticationError = AuthenticationError;
//# sourceMappingURL=authentication.error.js.map