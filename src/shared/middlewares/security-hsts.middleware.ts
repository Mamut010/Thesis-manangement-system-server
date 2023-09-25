/**
 * @Cre https://github.com/w3tecch/express-typescript-boilerplate/blob/develop/src/api/middlewares/SecurityHstsMiddleware.ts
 */

import * as express from 'express';
import * as helmet from 'helmet';
import { injectable } from 'inversify';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { AUTH_SETTINGS } from '../../settings/auth-settings';

@Middleware({ type: 'before' })
@injectable()
export class SecurityHstsMiddleware implements ExpressMiddlewareInterface {
    private handler = helmet.hsts({
        maxAge: AUTH_SETTINGS.Helmet.HstsMaxAge,
        includeSubDomains: true,
    });

    public use(req: express.Request, res: express.Response, next: express.NextFunction): any {
        return this.handler(req, res, next);
    }
}