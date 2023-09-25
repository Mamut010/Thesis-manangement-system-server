import bodyParser from 'body-parser';
import * as express from 'express';
import { injectable } from 'inversify';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'before' })
@injectable()
export class UrlEncodedBodyParserMiddleware implements ExpressMiddlewareInterface {
    private handler = bodyParser.urlencoded({ extended: true });

    public use(req: express.Request, res: express.Response, next: express.NextFunction): any {
        return this.handler(req, res, next);
    }
}