import * as express from 'express';
import { injectable } from 'inversify';
import nocache from 'nocache';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'before' })
@injectable()
export class NoCacheMiddleware implements ExpressMiddlewareInterface {
    private handler = nocache();

    public use(req: express.Request, res: express.Response, next: express.NextFunction): any {
        return this.handler(req, res, next);
    }
}