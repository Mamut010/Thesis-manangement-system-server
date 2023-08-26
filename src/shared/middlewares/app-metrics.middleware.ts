import * as express from 'express';
import { inject, injectable, optional } from 'inversify';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { INJECTION_TOKENS } from '../../core/constants/injection-tokens';

@Middleware({ type: 'before' })
@injectable()
export class AppMetricsMiddleware implements ExpressMiddlewareInterface {
    constructor(
        @inject(INJECTION_TOKENS.AppMetricsHandler) @optional() private requestHandler?: express.RequestHandler) {

    }

    public use(req: express.Request, res: express.Response, next: express.NextFunction): any {
        return this.requestHandler 
            ? this.requestHandler(req, res, next) 
            : next();
    }
}