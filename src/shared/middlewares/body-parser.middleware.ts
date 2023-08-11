import bodyParser from 'body-parser';
import * as express from 'express';
import { injectable } from 'inversify';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'before' })
@injectable()
export class BodyParserMiddleware implements ExpressMiddlewareInterface {
    public use(req: express.Request, res: express.Response, next: express.NextFunction): any {
        return bodyParser.urlencoded({ extended: true })(req, res, next);
    }
}