import { 
    ConnectedSocket, 
    EmitOnSuccess, 
    MessageBody, 
    OnConnect, 
    OnMessage, 
    SkipEmitOnEmptyResult 
} from "socket-controllers";
import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { WsSetupServiceInterface } from "../interfaces";
import { CLIENT_TO_SERVER_EVENTS, SERVER_TO_CLIENT_EVENTS } from "../../contracts/constants/io";
import { WsAuthenticateRequest } from "../../contracts/requests/ws-authenticate.request";
import { IODefaultSocket } from "../../contracts/types/io";

@injectable()
export abstract class BaseSocketController {
    constructor(@inject(INJECTION_TOKENS.WsSetupService) private wsSetupService: WsSetupServiceInterface) {

    }

    @OnConnect()
    async connect(@ConnectedSocket() socket: IODefaultSocket) {
        await this.wsSetupService.onConnect(socket);
    }

    @OnMessage(CLIENT_TO_SERVER_EVENTS.Default.Authenticate)
    @EmitOnSuccess(SERVER_TO_CLIENT_EVENTS.Default.AuthenticateFinished)
    async authenticate(@ConnectedSocket() socket: IODefaultSocket, @MessageBody() request: WsAuthenticateRequest) {
        return await this.wsSetupService.onAuthenticate(socket, request);
    }
}