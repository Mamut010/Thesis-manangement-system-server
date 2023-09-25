import cookieParser from 'cookie-parser';
import { Request, Response, NextFunction } from 'express';
import { injectable } from 'inversify';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { env } from '../../env';

@Middleware({ type: 'before' })
@injectable()
export class CookieParserMiddleware implements ExpressMiddlewareInterface {
    private handler = cookieParser(env.auth.cookieSecret);

    public use(req: Request, res: Response, next: NextFunction): any {
        return this.handler(req, res, next);
    }
}