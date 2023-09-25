/**
 * @Cre https://github.com/w3tecch/express-typescript-boilerplate/blob/develop/src/api/middlewares/CompressionMiddleware.ts
 */

import compression from 'compression';
import * as express from 'express';
import { injectable } from 'inversify';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'before' })
@injectable()
export class CompressionMiddleware implements ExpressMiddlewareInterface {
    private handler = compression();

    public use(req: express.Request, res: express.Response, next: express.NextFunction): any {
        return this.handler(req, res, next);
    }

}