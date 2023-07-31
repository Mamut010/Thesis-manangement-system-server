"use strict";
/**
 * @see https://github.com/w3tecch/express-typescript-boilerplate/blob/develop/src/app.ts
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const logger_1 = require("./lib/logger");
const banner_1 = require("./lib/banner");
const bootstrapper_1 = require("./lib/bootstrapper");
const bootstrappers_1 = require("./core/bootstrappers");
const log = new logger_1.Logger(__filename);
(0, bootstrapper_1.bootstrap)({
    bootstrappers: [
        /**
         * Bootstrapper is a place where you can configure all your modules during bootstrapping
         * process. All bootstrappers are executed one by one in a sequential order.
         */
        bootstrappers_1.bootstrapWinston,
        bootstrappers_1.bootstrapIoc,
        bootstrappers_1.bootstrapAuthServer,
        bootstrappers_1.bootstrapSwagger,
        bootstrappers_1.bootstrapAuthHome,
    ],
    externalDeps: {
        ['logger']: log
    }
})
    .then(() => (0, banner_1.banner)(log, 'auth'))
    .catch((error) => log.error('Application is crashed: ' + (error.stack ?? error.message)));
//# sourceMappingURL=auth.server.js.map