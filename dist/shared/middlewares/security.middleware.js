"use strict";
/**
 * @Cre https://github.com/w3tecch/express-typescript-boilerplate/blob/develop/src/api/middlewares/SecurityMiddleware.ts
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityMiddleware = void 0;
const tslib_1 = require("tslib");
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const inversify_1 = require("inversify");
const routing_controllers_1 = require("routing-controllers");
let SecurityMiddleware = exports.SecurityMiddleware = class SecurityMiddleware {
    use(req, res, next) {
        return (0, helmet_1.default)()(req, res, next);
    }
};
exports.SecurityMiddleware = SecurityMiddleware = tslib_1.__decorate([
    (0, routing_controllers_1.Middleware)({ type: 'before' }),
    (0, inversify_1.injectable)()
], SecurityMiddleware);
//# sourceMappingURL=security.middleware.js.map