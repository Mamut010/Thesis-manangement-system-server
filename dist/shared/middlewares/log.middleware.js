"use strict";
/**
 * @Cre https://github.com/w3tecch/express-typescript-boilerplate/blob/develop/src/api/middlewares/LogMiddleware.ts
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogMiddleware = void 0;
const tslib_1 = require("tslib");
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const routing_controllers_1 = require("routing-controllers");
const env_1 = require("../../env");
const inversify_1 = require("inversify");
const injection_tokens_1 = require("../../core/constants/injection-tokens");
let LogMiddleware = exports.LogMiddleware = class LogMiddleware {
    constructor(log) {
        this.log = log;
    }
    use(req, res, next) {
        return (0, morgan_1.default)(env_1.env.log.output, {
            stream: {
                write: this.log.info.bind(this.log),
            },
        })(req, res, next);
    }
};
exports.LogMiddleware = LogMiddleware = tslib_1.__decorate([
    (0, routing_controllers_1.Middleware)({ type: 'before' }),
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(injection_tokens_1.INJECTION_TOKENS.Logger)),
    tslib_1.__metadata("design:paramtypes", [Object])
], LogMiddleware);
//# sourceMappingURL=log.middleware.js.map