/**
 * @see https://github.com/w3tecch/express-typescript-boilerplate/blob/develop/src/app.ts
 */

import 'reflect-metadata';
import { Logger } from './lib/logger';
import { banner } from './lib/banner';
import { bootstrap } from "./lib/bootstrapper";
import { 
    bootstrapApiServer, 
    bootstrapApiHome, 
    bootstrapIoc, 
    bootstrapWinston, 
    bootstrapSwagger, 
    bootstrapIo
} from './core/bootstrappers';

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
        bootstrapApiHome,
    ],
    externalDeps: {
        ['logger']: log
    }
})
    .then(() => banner(log, 'api'))
    .catch((error: Error) => log.error('Application is crashed: ' + (error.stack ?? error.message)));