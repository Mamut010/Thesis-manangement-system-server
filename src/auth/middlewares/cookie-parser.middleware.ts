import cookieParser from 'cookie-parser';
import { Request, Response, NextFunction } from 'express';
import { injectable } from 'inversify';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { env } from '../../env';

@Middleware({ type: 'before' })
@injectable()
export class CompressionMiddleware implements ExpressMiddlewareInterface {
    public use(req: Request, res: Response, next: NextFunction): any {
        return cookieParser(env.auth.cookieSecret)(req, res, next);
    }
}