"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompressionMiddleware = void 0;
const tslib_1 = require("tslib");
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const inversify_1 = require("inversify");
const routing_controllers_1 = require("routing-controllers");
let CompressionMiddleware = exports.CompressionMiddleware = class CompressionMiddleware {
    use(req, res, next) {
        return (0, cookie_parser_1.default)()(req, res, next);
    }
};
exports.CompressionMiddleware = CompressionMiddleware = tslib_1.__decorate([
    (0, routing_controllers_1.Middleware)({ type: 'before' }),
    (0, inversify_1.injectable)()
], CompressionMiddleware);
//# sourceMappingURL=cookie-parser.middleware.js.map