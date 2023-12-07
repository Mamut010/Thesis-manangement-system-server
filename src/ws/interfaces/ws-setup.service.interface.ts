import { WsAuthenticateRequest } from "../../contracts/requests";
import { WsAuthenticateResponse } from "../../contracts/responses";
import { IODefaultSocket } from "../../contracts/types/io";

export interface WsSetupServiceInterface {
    onConnect(socket: IODefaultSocket): Promise<void>;
    onDisconnect(socket: IODefaultSocket): void;
    onAuthenticate(socket: IODefaultSocket, request: WsAuthenticateRequest): Promise<WsAuthenticateResponse>;
}