"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrapAuthServer = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const routing_controllers_1 = require("routing-controllers");
const env_1 = require("../../env");
const app_config_1 = require("../../config/app.config");
const auth_checkers_1 = require("../auth-checkers");
const bootstrapAuthServer = (settings) => {
    if (!settings) {
        return;
    }
    /**
     * We create a new express server instance.
     * We could have also use useExpressServer here to attach controllers to an existing express instance.
     */
    const expressApp = (0, express_1.default)();
    /**
     * Pre-configure express app
     */
    (0, app_config_1.preconfigApp)(expressApp, settings);
    /**
     * Add routing-controllers options to express app
     */
    const routingControllersOptions = {
        cors: true,
        classTransformer: true,
        // validation: {
        //     validationError: { target: false }
        // },
        validation: true,
        routePrefix: env_1.env.app.servers.auth.routePrefix,
        defaultErrorHandler: false,
        /**
         * We can add options about how routing-controllers should configure itself.
         * Here we specify what controllers should be registered in our express server.
         */
        controllers: env_1.env.app.servers.auth.dirs.controllers,
        middlewares: [...env_1.env.app.servers.auth.dirs.middlewares, ...env_1.env.app.shared.dirs.middlewares],
        interceptors: [...env_1.env.app.servers.auth.dirs.interceptors, ...env_1.env.app.shared.dirs.interceptors],
        /**
         * Authorization features
         */
        authorizationChecker: auth_checkers_1.authorizationChecker,
        currentUserChecker: auth_checkers_1.currentUserChecker,
    };
    (0, routing_controllers_1.useExpressServer)(expressApp, routingControllersOptions);
    /**
     * Post-configure express app
     */
    (0, app_config_1.postconfigApp)(expressApp, settings);
    // Run application to listen on given port
    if (!env_1.env.isTest) {
        const server = expressApp.listen(env_1.env.app.servers.auth.port);
        settings.setData('express_server', server);
        settings.setData('server_url', `${env_1.env.app.schema}://${env_1.env.app.host}:${env_1.env.app.servers.auth.port}`);
    }
    // Here we can set the data for other bootstrappers
    settings.setData('express_app', expressApp);
    settings.setData('routing_controllers_options', routingControllersOptions);
};
exports.bootstrapAuthServer = bootstrapAuthServer;
//# sourceMappingURL=auth.bootstrapper.js.map