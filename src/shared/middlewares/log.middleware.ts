/**
 * @Cre https://github.com/w3tecch/express-typescript-boilerplate/blob/develop/src/api/middlewares/LogMiddleware.ts
 */

import * as express from 'express';
import morgan from 'morgan';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

import { env } from '../../env';
import { LoggerInterface } from '../../lib/logger';
import { inject, injectable } from 'inversify';
import { INJECTION_TOKENS } from '../../core/constants/injection-tokens';

@Middleware({ type: 'before' })
@injectable()
export class LogMiddleware implements ExpressMiddlewareInterface {
    private handler;

    constructor(@inject(INJECTION_TOKENS.Logger) log: LoggerInterface) {
        this.handler = morgan(env.log.output, {
            stream: {
                write: log.info.bind(log),
            },
        });
    }

    public use(req: express.Request, res: express.Response, next: express.NextFunction): any {
        return this.handler(req, res, next);
    }
}