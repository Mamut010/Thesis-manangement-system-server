import { WsAuthenticateRequest } from "../../contracts/requests/ws-authenticate.request";
import { WsAuthenticateResponse } from "../../contracts/responses/ws-authenticate.response";
import { IODefaultSocket } from "../../contracts/types/io";

export interface WsSetupServiceInterface {
    onConnection(socket: IODefaultSocket): Promise<void>;
    onAuthenticate(socket: IODefaultSocket, request: WsAuthenticateRequest): Promise<WsAuthenticateResponse | undefined>;
    getRoom(userId: number): string;
}