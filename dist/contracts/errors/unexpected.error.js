"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnexpectedError = void 0;
const routing_controllers_1 = require("routing-controllers");
const http_codes_1 = require("../../core/enums/http-codes");
class UnexpectedError extends routing_controllers_1.HttpError {
    constructor(message = 'An unexpected error has occured') {
        super(http_codes_1.HttpCodes.InternalServerError, message);
    }
}
exports.UnexpectedError = UnexpectedError;
//# sourceMappingURL=unexpected.error.js.map