"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultLoggerFactory = void 0;
const logger_1 = require("./logger");
const DefaultLoggerFactory = (scope) => {
    return new logger_1.Logger(scope);
};
exports.DefaultLoggerFactory = DefaultLoggerFactory;
//# sourceMappingURL=logger.factory.js.map