import bodyParser from 'body-parser';
import * as express from 'express';
import { injectable } from 'inversify';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'before' })
@injectable()
export class JsonBodyParserMiddleware implements ExpressMiddlewareInterface {
    private handler = bodyParser.json();

    public use(req: express.Request, res: express.Response, next: express.NextFunction): any {
        return this.handler(req, res, next);
    }
}