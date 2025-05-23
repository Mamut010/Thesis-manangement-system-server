import express, { Application } from 'express';
import { RoutingControllersOptions, useExpressServer } from 'routing-controllers';
import { env } from '../../env';
import { authorizationChecker, currentUserChecker } from '../auth-checkers';
import { BootstrapSettingInterface, Bootstrapper } from '../../lib/bootstrapper';
import { preconfigApp, postconfigApp } from '../../config';
import { ServerType } from '../../shared/types/server-types';
import { CORS_SETTINGS } from '../../settings/cors-settings';
import { BOOTSTRAP_SETTINGS_KEY } from '../../settings/bootstrap-settings';
import { route } from '../../utils/route-helpers';

export const serverBootstrapperFactory = (serverType: ServerType): Bootstrapper => {
    return (settings?: BootstrapSettingInterface) => {
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
            cors: CORS_SETTINGS,
            classTransformer: true,
            plainToClassTransformOptions: { 
                excludeExtraneousValues: true, 
                exposeUnsetFields: false, 
                exposeDefaultValues: true,
            },
            validation: true,
            routePrefix: env.app.servers[serverType].routePrefix,
            defaultErrorHandler: false,
    
            /**
             * We can add options about how routing-controllers should configure itself.
             * Here we specify what controllers should be registered in our express server.
             */
            controllers: env.app.servers[serverType].dirs.controllers,
            middlewares: [...env.app.shared.dirs.middlewares, ...env.app.servers[serverType].dirs.middlewares],
            interceptors: [...env.app.shared.dirs.interceptors, ...env.app.servers[serverType].dirs.interceptors],
    
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
            const server = expressApp.listen(env.app.servers[serverType].port, env.app.host);
            settings.setData(BOOTSTRAP_SETTINGS_KEY.ExpressServer, server);
            settings.setData(BOOTSTRAP_SETTINGS_KEY.ServerUrl, route(serverType));
        }
    
        // Here we can set the data for other bootstrappers
        settings.setData(BOOTSTRAP_SETTINGS_KEY.ExpressApp, expressApp);
        settings.setData(BOOTSTRAP_SETTINGS_KEY.RoutingControllersOptions, routingControllersOptions);
    };
}