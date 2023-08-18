import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { JwtExtractorServiceInterface, JwtServiceInterface, UuidServiceInterface } from "../../shared/interfaces";
import { WsSetupServiceInterface } from "../interfaces";
import { WsAuthenticateRequest } from "../../contracts/requests/ws-authenticate.request";
import { WsAuthenticateResponse } from "../../contracts/responses/ws-authenticate.response";
import { sleep } from "../../utils/timer-helpers";
import { IODefaultSocket } from "../../contracts/types/io";

@injectable()
export class WsSetupService implements WsSetupServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.UuidService) private uuidService: UuidServiceInterface,
        @inject(INJECTION_TOKENS.JwtExtractor) private jwtExtractor: JwtExtractorServiceInterface,
        @inject(INJECTION_TOKENS.JwtService) private jwtService: JwtServiceInterface) {
        
    }

    async onConnection(socket: IODefaultSocket): Promise<void> {
        // Force all connection from the same user to join the same room.
        // This way, every emit to the 'userId' room will be reflected on all tabs if the client opens multiple tabs
        const room = this.getRoom(socket.data.user.userId);
        await socket.join(room);
    }

    async onAuthenticate(socket: IODefaultSocket, request: WsAuthenticateRequest): Promise<WsAuthenticateResponse | undefined> {
        // TODO: Implement authentication mechanism
        await sleep(1000);
        return { authenticated: true };
    }

    getRoom(userId: number): string {
        return this.uuidService.generate(userId);
    }
}