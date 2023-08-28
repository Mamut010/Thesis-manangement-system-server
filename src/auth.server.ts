/**
 * @see https://github.com/w3tecch/express-typescript-boilerplate/blob/develop/src/app.ts
 */

import 'reflect-metadata';
/**
 * Set up tracing and register instrumentation before importing instrumented libraries
 */
import { initializeTracer } from './core/instrumentation';
import { SERVER_SETTINGS } from './settings/server-settings';
const { tracer, specs } = initializeTracer(SERVER_SETTINGS.Auth.ServiceName);

import { Logger } from './lib/logger';
import { banner } from './lib/banner';
import { BootstrapSettingInterface, bootstrap } from "./lib/bootstrapper";
import { 
    bootstrapAuthServer, 
    bootstrapAuthHome, 
    bootstrapIoc, 
    bootstrapWinston, 
    bootstrapSwagger,
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
        bootstrapAuthServer,
        bootstrapSwagger,
        bootstrapMetrics,
        bootstrapAuthHome,
    ],
    externalDeps: {
        [BOOTSTRAP_SETTINGS_KEY.Tracer]: tracer,
        [BOOTSTRAP_SETTINGS_KEY.TracerSpecs]: specs,
        [BOOTSTRAP_SETTINGS_KEY.Logger]: log,
        [BOOTSTRAP_SETTINGS_KEY.ServerName]: SERVER_SETTINGS.Auth.ServerName,
    }
})
    .then((settings: BootstrapSettingInterface) => banner(log, 'auth', settings))
    .catch((error: Error) => log.error('Application is crashed: ' + (error.stack ?? error.message)));