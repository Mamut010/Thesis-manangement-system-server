"use strict";
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const inversify_1 = require("inversify");
const routing_controllers_1 = require("routing-controllers");
const http_codes_1 = require("../../core/enums/http-codes");
let ErrorHandler = exports.ErrorHandler = class ErrorHandler {
    error(error, request, response, next) {
        const status = getErrorStatus(error);
        const message = getErrorMessage(error);
        response.status(status).json({
            status,
            message,
        });
    }
};
exports.ErrorHandler = ErrorHandler = tslib_1.__decorate([
    (0, routing_controllers_1.Middleware)({ type: 'after' }),
    (0, inversify_1.injectable)()
], ErrorHandler);
function getErrorStatus(error) {
    if (Array.isArray(error) && error.length > 0 && error.every(err => err instanceof class_validator_1.ValidationError)) {
        return http_codes_1.HttpCodes.BadRequest;
    }
    else {
        const possibleStatusProperties = ['status', 'httpCode'];
        for (const prop of possibleStatusProperties) {
            if (error[prop]) {
                return error[prop];
            }
        }
        return http_codes_1.HttpCodes.InternalServerError;
    }
}
function getErrorMessage(error) {
    const possibleMsgProperties = ['errors', 'message'];
    for (const prop of possibleMsgProperties) {
        if (error[prop]) {
            return error[prop];
        }
    }
    return 'Unexpected error has occurred!';
}
//# sourceMappingURL=error.middleware.js.map