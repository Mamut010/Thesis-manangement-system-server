import * as express from 'express';
import { injectable } from 'inversify';
import nocache from 'nocache';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'before' })
@injectable()
export class NoCacheMiddleware implements ExpressMiddlewareInterface {
    public use(req: express.Request, res: express.Response, next: express.NextFunction): any {
        return nocache()(req, res, next);
    }
}