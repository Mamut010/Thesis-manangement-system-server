import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { JwtExtractorServiceInterface, JwtServiceInterface, UuidServiceInterface } from "../../shared/interfaces";
import { WsSetupServiceInterface } from "../interfaces";
import { IOSocket } from "../../contracts/types/io";
import { AuthenticationError } from "../../contracts/errors/authentication.error";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";

@injectable()
export class WsSetupService implements WsSetupServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.UuidService) private uuidService: UuidServiceInterface,
        @inject(INJECTION_TOKENS.JwtExtractor) private jwtExtractor: JwtExtractorServiceInterface,
        @inject(INJECTION_TOKENS.JwtService) private jwtService: JwtServiceInterface) {
        
    }

    async onConnection(socket: IOSocket): Promise<void> {
        // Force all connection from the same user join the same room.
        // This way, every emit to the 'userId' room will be reflected on all tabs if the client opens multiple tabs
        await socket.join(this.getRoom(socket.data.user.userId));

        // Add a middleware to check the embedded token for every request
        socket.use((_, next) => {
            if (typeof socket.data.token !== 'string') {
                return next(new AuthenticationError(ERROR_MESSAGES.Auth.AccessTokenNotFound));
            }

            const jwtToken = this.jwtExtractor.extractSync(socket.data.token);
            if(!jwtToken) {
                return next(new AuthenticationError(ERROR_MESSAGES.Auth.InvalidAccessToken));
            }
    
            try {
                this.jwtService.verifyAccessToken(jwtToken);
            }
            catch {
                return next(new AuthenticationError(ERROR_MESSAGES.Auth.InvalidAccessToken));
            }
    
            next();
        }); 
    }

    getRoom(userId: number): string {
        return this.uuidService.generate(userId);
    }
}