import { Server, Socket } from "socket.io";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { WsAuthenticateRequest } from "../../requests/ws-authenticate.request";
import { WsAuthenticateResponse } from "../../responses/ws-authenticate.response";
import { CLIENT_TO_SERVER_EVENTS, SERVER_TO_CLIENT_EVENTS } from "../../constants/io";

// Default, general definition of all sockets
export interface ServerToClientDefaultEvents {  
    [SERVER_TO_CLIENT_EVENTS.Default.AuthenticateSuccess]:
        (response: WsAuthenticateResponse) => void;
}

export interface ClientToServerDefaultEvents {
    [CLIENT_TO_SERVER_EVENTS.Default.Authenticate]: 
        (request: WsAuthenticateRequest) => void;
}

export interface InterServerDefaultEvents {
}

export interface SocketDefaultData {
    user: AuthorizedUser;
}

export type IODefaultServer = Server<
    ClientToServerDefaultEvents, 
    ServerToClientDefaultEvents, 
    InterServerDefaultEvents, 
    SocketDefaultData>;
    
export type IODefaultSocket = Socket<
    ClientToServerDefaultEvents, 
    ServerToClientDefaultEvents, 
    InterServerDefaultEvents, 
    SocketDefaultData>;