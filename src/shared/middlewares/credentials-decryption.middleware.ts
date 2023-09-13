import * as express from 'express';
import { inject, injectable } from 'inversify';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { CryptoServiceInterface } from '../interfaces';
import { INJECTION_TOKENS } from '../../core/constants/injection-tokens';
import { env } from '../../env';
import { BadRequestError } from '../../contracts/errors/bad-request.error';
import { ERROR_MESSAGES } from '../../contracts/constants/error-messages';
import { objectHasOwnProperty } from '../../utils/object-helpers';
import { wrapDecryptionError } from '../../utils/wrap';

@Middleware({ type: 'before', priority: -1 })
@injectable()
export class CredentialsDecryptionMiddleware implements ExpressMiddlewareInterface {
    constructor(
        @inject(INJECTION_TOKENS.CryptoService) private cryptoService: CryptoServiceInterface,
        @inject(INJECTION_TOKENS.EncryptedProps) private readonly encryptedProps: Set<string>,
        @inject(INJECTION_TOKENS.IgnoreDecryptionProps) private readonly ignoreDecryptionProps: Set<string>) {

    }

    public use(req: express.Request, res: express.Response, next: express.NextFunction): any {
        const body = req.body as Record<string, unknown> | undefined;
        if (!body) {
            return next();
        }

        try {
            wrapDecryptionError(() => {
                const decrypted = this.decrypt(body, this.encryptedProps);
                const entries = Object.entries(decrypted);
                entries.forEach(([field, decryptedValue]) => {
                    if (!this.ignoreDecryptionProps.has(field)) {
                        body[field] = decryptedValue;
                    }
                });
            });
        }
        catch {
            return next(new BadRequestError(ERROR_MESSAGES.Auth.InvalidCredentials));
        }

        return next();
    }

    private decrypt<K extends string>(input: Record<string, unknown>, fields: Set<K>) {
        return Array.from(fields)
                    .filter(field => objectHasOwnProperty(input, field) && typeof input[field] === 'string')
                    .map(field => [field, input[field]] as [K, string])
                    .reduce((result, [field, rawValue]) => {
                        result[field] = this.cryptoService.decryptAsString(rawValue);
                        return result;
                    }, {} as Record<K, string>);
    }
}