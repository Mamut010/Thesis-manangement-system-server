import * as express from 'express';
import { inject, injectable } from 'inversify';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { INJECTION_TOKENS } from '../../core/constants/injection-tokens';
import { AuthServiceInterface } from '../../auth/interfaces';
import { setRequestProp } from '../../utils/req-res-helpers';
import { AUTHORIZED_USER_PROP } from '../../core/auth-checkers';

@Middleware({ type: 'before' })
@injectable()
export class AuthMiddleware implements ExpressMiddlewareInterface {
    constructor(
        @inject(INJECTION_TOKENS.AuthService) private authService: AuthServiceInterface) {

    }

    public async use(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        try {
            const payload = await this.authService.verifyJwtTokenInRequest(req);
            const context = payload?.context;
            if (context) {
                setRequestProp(req, AUTHORIZED_USER_PROP, context);
            }
        }
        catch {
            // DO NOTHING
        }

        return next();
    }
}