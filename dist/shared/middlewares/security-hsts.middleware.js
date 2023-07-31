"use strict";
/**
 * @Cre https://github.com/w3tecch/express-typescript-boilerplate/blob/develop/src/api/middlewares/SecurityHstsMiddleware.ts
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityHstsMiddleware = void 0;
const tslib_1 = require("tslib");
const helmet = tslib_1.__importStar(require("helmet"));
const inversify_1 = require("inversify");
const routing_controllers_1 = require("routing-controllers");
const auth_settings_1 = require("../../core/constants/auth-settings");
let SecurityHstsMiddleware = exports.SecurityHstsMiddleware = class SecurityHstsMiddleware {
    use(req, res, next) {
        return helmet.hsts({
            maxAge: auth_settings_1.AUTH_SETTINGS.Helmet.HstsMaxAge,
            includeSubDomains: true,
        })(req, res, next);
    }
};
exports.SecurityHstsMiddleware = SecurityHstsMiddleware = tslib_1.__decorate([
    (0, routing_controllers_1.Middleware)({ type: 'before' }),
    (0, inversify_1.injectable)()
], SecurityHstsMiddleware);
//# sourceMappingURL=security-hsts.middleware.js.map