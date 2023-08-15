import { ConnectedSocket, OnConnect } from "socket-controllers";
import { IOSocket } from "../../contracts/types/io";
import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { WsSetupServiceInterface } from "../interfaces";

@injectable()
export abstract class BaseSocketController {
    constructor(@inject(INJECTION_TOKENS.WsSetupService) private wsSetupService: WsSetupServiceInterface) {

    }

    @OnConnect()
    async connection(@ConnectedSocket() socket: IOSocket) {
        await this.wsSetupService.onConnection(socket);
    }
}