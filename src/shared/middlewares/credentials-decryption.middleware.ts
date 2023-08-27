import * as express from 'express';
import { inject, injectable } from 'inversify';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { CryptoServiceInterface } from '../interfaces';
import { INJECTION_TOKENS } from '../../core/constants/injection-tokens';
import { env } from '../../env';
import { BadRequestError } from '../../contracts/errors/bad-request.error';
import { ERROR_MESSAGES } from '../../contracts/constants/error-messages';

@Middleware({ type: 'before', priority: -1 })
@injectable()
export class CredentialsDecryptionMiddleware implements ExpressMiddlewareInterface {
    constructor(@inject(INJECTION_TOKENS.CryptoService) private cryptoService: CryptoServiceInterface) {

    }

    public use(req: express.Request, res: express.Response, next: express.NextFunction): any {
        const body = req.body as Record<string, any> | undefined;
        if (!body || (!body.username && !body.password)) {
            return next();
        }

        try {
            let decryptedUsername: string | undefined = undefined;
            let decryptedPassword: string | undefined = undefined;
            
            if (typeof body.username === 'string') {
                decryptedUsername = this.cryptoService.decryptAsString(body.username);
            }
            if (typeof body.password === 'string') {
                decryptedPassword = this.cryptoService.decryptAsString(body.password);
            }

            if (decryptedUsername) {
                body.username = decryptedUsername;
            }
            if (decryptedPassword) {
                body.password = decryptedPassword;
            }
        }
        catch {
            if (!env.isDevelopment) {
                return next(new BadRequestError(ERROR_MESSAGES.Auth.InvalidCredentials));
            }
        }

        return next();
    }

    private isString(obj: unknown): obj is string {
        return typeof obj === 'string';
    }
}