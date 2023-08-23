import { WsAuthenticateRequest } from "../../contracts/requests";
import { WsAuthenticateResponse } from "../../contracts/responses";
import { IODefaultSocket } from "../../contracts/types/io";

export interface WsSetupServiceInterface {
    onConnect(socket: IODefaultSocket): Promise<void>;
    onAuthenticate(socket: IODefaultSocket, request: WsAuthenticateRequest): Promise<WsAuthenticateResponse>;
    onDisconnect(socket: IODefaultSocket): void;
}