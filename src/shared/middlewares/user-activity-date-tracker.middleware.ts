import * as express from 'express';
import { inject, injectable } from 'inversify';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { INJECTION_TOKENS } from '../../core/constants/injection-tokens';
import { UserRepoInterface } from '../../dal/interfaces';
import { getRequestProp } from '../../utils/req-res-helpers';
import { AUTHORIZED_USER_PROP, AuthorizedUser } from '../../core/auth-checkers';

@Middleware({ type: 'before', priority: -1 })
@injectable()
export class UserActivityDateTrackerMiddleware implements ExpressMiddlewareInterface {
    constructor(
        @inject(INJECTION_TOKENS.UserRepo) private userRepo: UserRepoInterface) {

    }

    public async use(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        const user = getRequestProp<AuthorizedUser>(req, AUTHORIZED_USER_PROP);
        if (user) {
            await this.userRepo.update(user.userId, {
                lastActivityDate: new Date()
            });
        }

        return next();
    }
}