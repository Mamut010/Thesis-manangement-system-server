/**
 * @Cre https://github.com/w3tecch/express-typescript-boilerplate/blob/develop/src/api/middlewares/SecurityMiddleware.ts
 */

import * as express from 'express';
import helmet from 'helmet';
import { injectable } from 'inversify';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'before' })
@injectable()
export class SecurityMiddleware implements ExpressMiddlewareInterface {

    public use(req: express.Request, res: express.Response, next: express.NextFunction): any {
        return helmet()(req, res, next);
    }

}