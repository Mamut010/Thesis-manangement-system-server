"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const routing_controllers_1 = require("routing-controllers");
const http_codes_1 = require("../../core/enums/http-codes");
class UnauthorizedError extends routing_controllers_1.HttpError {
    constructor(message = 'An authorization error has occured') {
        super(http_codes_1.HttpCodes.Unauthorized, message);
    }
}
exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=unauthorized.error.js.map