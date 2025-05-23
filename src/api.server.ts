/**
 * @see https://github.com/w3tecch/express-typescript-boilerplate/blob/develop/src/app.ts
 */

import 'reflect-metadata';
/**
 * Set up tracing and register instrumentation before importing instrumented libraries
 */
import { initializeTracer } from './core/instrumentation';
import { SERVER_SETTINGS } from './settings/server-settings';
const { tracer, specs } = initializeTracer(SERVER_SETTINGS.Api.ServiceName);

import { Logger } from './lib/logger';
import { banner } from './lib/banner';
import { BootstrapSettingInterface, bootstrap } from "./lib/bootstrapper";
import { 
    bootstrapApiServer, 
    bootstrapApiHome, 
    bootstrapIoc, 
    bootstrapWinston, 
    bootstrapSwagger, 
    bootstrapIo,
    bootstrapSocketAdminUI,
    bootstrapMetrics
} from './core/bootstrappers';
import { BOOTSTRAP_SETTINGS_KEY } from './settings/bootstrap-settings';

const log = new Logger(__filename);

bootstrap({
    bootstrappers: [
        /**
         * Bootstrapper is a place where you can configure all your modules during bootstrapping
         * process. All bootstrappers are executed one by one in a sequential order.
         */
        bootstrapWinston, 
        bootstrapIoc,
        bootstrapApiServer,
        bootstrapIo,
        bootstrapSwagger,
        bootstrapSocketAdminUI,
        bootstrapMetrics,
        bootstrapApiHome,
    ],
    externalDeps: {
        [BOOTSTRAP_SETTINGS_KEY.Tracer]: tracer,
        [BOOTSTRAP_SETTINGS_KEY.TracerSpecs]: specs,
        [BOOTSTRAP_SETTINGS_KEY.Logger]: log,
        [BOOTSTRAP_SETTINGS_KEY.ServerName]: SERVER_SETTINGS.Api.ServerName,
    }
})
    .then((settings: BootstrapSettingInterface) => banner(log, 'api', settings))
    .catch((error: Error) => log.error('Application is crashed: ' + (error.stack ?? error.message)));