import { Middleware, MiddlewareInterface } from 'socket-controllers';
import { inject, injectable } from 'inversify';
import { INJECTION_TOKENS } from '../../core/constants/injection-tokens';
import { JwtExtractorServiceInterface, JwtServiceInterface } from '../../shared/interfaces';
import { AuthenticationError } from '../../contracts/errors/authentication.error';
import { ERROR_MESSAGES } from '../../contracts/constants/error-messages';
import { IO_NAMESPACES } from '../constants/io-namespaces';
import { IODefaultSocket } from '../../contracts/types/io';

@Middleware({ namespace: IO_NAMESPACES.Any })
@injectable()
export class AuthMiddleware implements MiddlewareInterface {
    constructor(
        @inject(INJECTION_TOKENS.JwtExtractor) private jwtExtractor: JwtExtractorServiceInterface,
        @inject(INJECTION_TOKENS.JwtService) private jwtService: JwtServiceInterface) {

    }

    async use(socket: IODefaultSocket, next: (err?: any) => unknown) {
        const token: unknown = socket.handshake.auth['token'];
        if (typeof token !== 'string') {
            return next(new AuthenticationError(ERROR_MESSAGES.Auth.AccessTokenNotFound));
        }

        const jwtToken = await this.jwtExtractor.extract(token);
        if(!jwtToken) {
            return next(new AuthenticationError(ERROR_MESSAGES.Auth.AccessTokenNotFound));
        }

        try {
            const payload = this.jwtService.verifyAccessToken(jwtToken);
            socket.data.user = payload.context;
            socket.data.authPayload = payload;
        }
        catch {
            return next(new AuthenticationError(ERROR_MESSAGES.Auth.InvalidAccessToken));
        }

        next();
    }
}