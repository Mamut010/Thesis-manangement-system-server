import { WsAuthenticateRequest } from "../../contracts/requests/ws-authenticate.request";
import { WsAuthenticateResponse } from "../../contracts/responses/ws-authenticate.response";
import { IODefaultSocket } from "../../contracts/types/io";

export interface WsSetupServiceInterface {
    onConnect(socket: IODefaultSocket): Promise<void>;
    onAuthenticate(socket: IODefaultSocket, request: WsAuthenticateRequest): Promise<WsAuthenticateResponse>;
}