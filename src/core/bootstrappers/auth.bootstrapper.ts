import express, { Application } from 'express';
import { RoutingControllersOptions, useExpressServer } from 'routing-controllers';
import { env } from '../../env';
import { BootstrapSettingInterface, Bootstrapper } from '../../lib/bootstrapper';
import { preconfigApp, postconfigApp } from '../../config/app.config';
import { authorizationChecker, currentUserChecker } from '../auth-checkers';

export const bootstrapAuthServer: Bootstrapper = (settings?: BootstrapSettingInterface) => {
    if (!settings) {
        return;
    }
    
    /**
     * We create a new express server instance.
     * We could have also use useExpressServer here to attach controllers to an existing express instance.
     */
    const expressApp: Application = express();

    /**
     * Pre-configure express app
     */
    preconfigApp(expressApp, settings);

    /**
     * Add routing-controllers options to express app
     */
    const routingControllersOptions: RoutingControllersOptions = {
        cors: {
            origin: env.cors.allowOrigins,
            credentials: true,
        },
        classTransformer: true,
        plainToClassTransformOptions: { exposeDefaultValues: true },
        validation: true,
        routePrefix: env.app.servers.auth.routePrefix,
        defaultErrorHandler: false,
        /**
         * We can add options about how routing-controllers should configure itself.
         * Here we specify what controllers should be registered in our express server.
         */
        controllers: env.app.servers.auth.dirs.controllers,
        middlewares: [...env.app.servers.auth.dirs.middlewares, ...env.app.shared.dirs.middlewares],
        interceptors: [...env.app.servers.auth.dirs.interceptors, ...env.app.shared.dirs.interceptors],

        /**
         * Authorization features
         */
        authorizationChecker: authorizationChecker,
        currentUserChecker: currentUserChecker,
    };
    useExpressServer(expressApp, routingControllersOptions);

    /**
     * Post-configure express app
     */
    postconfigApp(expressApp, settings);

    // Run application to listen on given port
    if (!env.isTest) {
        const server = expressApp.listen(env.app.servers.auth.port);
        settings.setData('express_server', server);
        settings.setData('server_url', `${env.app.schema}://${env.app.host}:${env.app.servers.auth.port}`);
    }

    // Here we can set the data for other bootstrappers
    settings.setData('express_app', expressApp);
    settings.setData('routing_controllers_options', routingControllersOptions);
};