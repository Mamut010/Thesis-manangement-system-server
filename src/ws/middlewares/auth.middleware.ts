import { Middleware, MiddlewareInterface } from 'socket-controllers';
import { IOSocket } from '../../contracts/types/io';
import { inject, injectable } from 'inversify';
import { INJECTION_TOKENS } from '../../core/constants/injection-tokens';
import { JwtExtractorServiceInterface, JwtServiceInterface } from '../../shared/interfaces';
import { AuthenticationError } from '../../contracts/errors/authentication.error';
import { ERROR_MESSAGES } from '../../contracts/constants/error-messages';

@Middleware()
@injectable()
export class AuthMiddleware implements MiddlewareInterface {
    constructor(
        @inject(INJECTION_TOKENS.JwtExtractor) private jwtExtractor: JwtExtractorServiceInterface,
        @inject(INJECTION_TOKENS.JwtService) private jwtService: JwtServiceInterface) {

    }

    async use(socket: IOSocket, next: (err?: any) => any) {
        const token: unknown = socket.handshake.auth['token'];
        if (typeof token !== 'string') {
            return next(new AuthenticationError(ERROR_MESSAGES.Auth.InvalidAccessToken));
        }

        socket.data.token = token;

        const jwtToken = await this.jwtExtractor.extract(token);
        if(!jwtToken) {
            return next(new AuthenticationError(ERROR_MESSAGES.Auth.InvalidAccessToken));
        }

        try {
            const payload = this.jwtService.verifyAccessToken(jwtToken);
            socket.data.user = payload.context;
        }
        catch {
            return next(new AuthenticationError(ERROR_MESSAGES.Auth.InvalidAccessToken));
        }

        next();
    }
}