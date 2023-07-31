"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const routing_controllers_1 = require("routing-controllers");
const http_codes_1 = require("../../core/enums/http-codes");
class BadRequestError extends routing_controllers_1.HttpError {
    constructor(message = BadRequestError.name) {
        super(http_codes_1.HttpCodes.BadRequest, message);
    }
}
exports.BadRequestError = BadRequestError;
//# sourceMappingURL=bad-request.error.js.map