"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postconfigApp = exports.preconfigApp = void 0;
/**
 * Config Express app with all neccessary settings before the initializations of routing-controllers.
 * @param target The Express app.
 * @param settings Bootstrapping process' settings.
 */
const preconfigApp = (target, settings) => {
    target.enable('trust proxy');
};
exports.preconfigApp = preconfigApp;
/**
 * Config Express app with all neccessary settings after the initializations of routing-controllers.
 * @param target The Express app.
 * @param settings Bootstrapping process' settings.
 */
const postconfigApp = (target, settings) => {
    // DO post configuration works
};
exports.postconfigApp = postconfigApp;
//# sourceMappingURL=app.config.js.map