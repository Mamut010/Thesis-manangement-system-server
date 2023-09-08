import * as express from 'express';
import { inject, injectable } from 'inversify';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { CryptoServiceInterface } from '../interfaces';
import { INJECTION_TOKENS } from '../../core/constants/injection-tokens';
import { env } from '../../env';
import { BadRequestError } from '../../contracts/errors/bad-request.error';
import { ERROR_MESSAGES } from '../../contracts/constants/error-messages';
import { objectHasOwnProperty } from '../../utils/object-helpers';
import { wrapDecryptionError } from '../../utils/cipher-helpers';

@Middleware({ type: 'before', priority: -1 })
@injectable()
export class CredentialsDecryptionMiddleware implements ExpressMiddlewareInterface {
    constructor(@inject(INJECTION_TOKENS.CryptoService) private cryptoService: CryptoServiceInterface) {

    }

    public use(req: express.Request, res: express.Response, next: express.NextFunction): any {
        const body = req.body as Record<string, unknown> | undefined;
        if (!body) {
            return next();
        }

        return wrapDecryptionError(() => {
            // Username, password and email should be encrypted
            const decrypted = this.decrypt(body, ['username', 'password', 'email']);
            const entries = Object.entries(decrypted) as [keyof typeof decrypted, string][];
            entries.forEach(([field, decryptedValue]) => {
                // Ignore email as we want to store encrypted email in the database
                if (field !== 'email') {
                    body[field] = decryptedValue;
                }
            })

            return next();
        }, 
            () => next(new BadRequestError(ERROR_MESSAGES.Auth.InvalidCredentials)));
    }

    private decrypt<K extends string>(input: Record<string, unknown>, fields: K[]) {
        return fields
                    .filter(field => objectHasOwnProperty(input, field) && typeof input[field] === 'string')
                    .map(field => [field, input[field]] as [K, string])
                    .reduce((result, [field, rawValue]) => {
                        result[field] = this.cryptoService.decryptAsString(rawValue);
                        return result;
                    }, {} as Partial<Record<K, string>>);
    }
}