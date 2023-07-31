"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const routing_controllers_1 = require("routing-controllers");
const http_codes_1 = require("../../core/enums/http-codes");
class NotFoundError extends routing_controllers_1.HttpError {
    constructor(message = NotFoundError.name) {
        super(http_codes_1.HttpCodes.NotFound, message);
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=not-found.error.js.map