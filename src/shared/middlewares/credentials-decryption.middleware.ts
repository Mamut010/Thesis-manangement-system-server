import * as express from 'express';
import { inject, injectable } from 'inversify';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { CryptoServiceInterface } from '../interfaces';
import { INJECTION_TOKENS } from '../../core/constants/injection-tokens';
import { env } from '../../env';
import { BadRequestError } from '../../contracts/errors/bad-request.error';
import { ERROR_MESSAGES } from '../../contracts/constants/error-messages';
import { objectHasOwnProperty } from '../../utils/object-helpers';

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

        try {
            // Username, password and email should be encrypted
            const decrypted = this.decrypt(body, ['username', 'password', 'email']);
            if (decrypted) {
                const entries = Object.entries(decrypted) as [keyof typeof decrypted, string][];
                entries.forEach(([field, decryptedValue]) => {
                    // Ignore email as we want to store encrypted email in the database
                    if (field !== 'email') {
                        body[field] = decryptedValue;
                    }
                })
            }
        }
        catch {
            if (!env.isDevelopment) {
                return next(new BadRequestError(ERROR_MESSAGES.Auth.InvalidCredentials));
            }
        }

        return next();
    }

    private decrypt<K extends string>(input: Record<string, unknown>, fields: K[]): Partial<Record<K, string>> | undefined {
        if (!fields.some(field => objectHasOwnProperty(input, field))) {
            return undefined;
        }

        const decryptedFields = fields.reduce((result, field) => {
            const rawValue = input[field];
            if (typeof rawValue === 'string') {
                result[field] = this.cryptoService.decryptAsString(rawValue);
            }
            return result;
        }, {} as Record<string, string>);

        return decryptedFields;
    }
}