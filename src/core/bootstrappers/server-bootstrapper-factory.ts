import express, { Application } from 'express';
import { RoutingControllersOptions, useExpressServer } from 'routing-controllers';
import { env } from '../../env';
import { authorizationChecker, currentUserChecker } from '../auth-checkers';
import { BootstrapSettingInterface, Bootstrapper } from '../../lib/bootstrapper';
import { preconfigApp, postconfigApp } from '../../config';
import { ServerType } from '../../shared/types/server-types';
import { CorsOptions } from 'cors';
import { HTTP_CODES } from '../constants/http-codes';

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
            cors: <CorsOptions> {
                origin: env.cors.allowOrigins,
                credentials: true,
                optionsSuccessStatus: HTTP_CODES.Ok,
            },
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
            settings.setData('express_server', server);
            settings.setData('server_url', `${env.app.schema}://${env.app.host}:${env.app.servers[serverType].port}`);
        }
    
        // Here we can set the data for other bootstrappers
        settings.setData('express_app', expressApp);
        settings.setData('routing_controllers_options', routingControllersOptions);
    };
}