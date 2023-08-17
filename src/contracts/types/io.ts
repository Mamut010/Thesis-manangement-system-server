import { Namespace, Server, Socket } from "socket.io";
import { AuthorizedUser } from "../../core/auth-checkers";
import { NotificationDto } from "../../shared/dtos";
import { NotificationMarkAsReadRequest } from "../requests/notification-mark-as-read.request";
import { CLIENT_TO_SERVER_EVENTS, SERVER_TO_CLIENT_EVENTS } from "../constants/io";
import { WsAuthenticateRequest } from "../requests/ws-authenticate.request";
import { WsAuthenticateResponse } from "../responses/ws-authenticate.response";

// Default, general definition of all sockets
export namespace Default {
    export interface ServerToClientEvents {  
        [SERVER_TO_CLIENT_EVENTS.Default.AuthenticateSuccess]:
            (response: WsAuthenticateResponse) => void;
    }

    export interface ClientToServerEvents {
        [CLIENT_TO_SERVER_EVENTS.Default.Authenticate]: 
            (request: WsAuthenticateRequest) => void;
    }

    export interface InterServerEvents {
    }

    export interface SocketData {
        user: AuthorizedUser;
    }
}
export type IODefaultServer = Server<
    Default.ClientToServerEvents, 
    Default.ServerToClientEvents, 
    Default.InterServerEvents, 
    Default.SocketData>;
export type IODefaultSocket = Socket<
    Default.ClientToServerEvents, 
    Default.ServerToClientEvents, 
    Default.InterServerEvents, 
    Default.SocketData>;

// Specific namespaces
export namespace NotificationsNsp {
    export interface ServerToClientNotificationsEvents extends Default.ServerToClientEvents {
        [SERVER_TO_CLIENT_EVENTS.Notifications.Received]: 
            (dto: NotificationDto) => void;
    }
      
    export interface ClientToServerNotificationsEvents extends Default.ClientToServerEvents {
        [CLIENT_TO_SERVER_EVENTS.Notifications.MarkAsRead]: 
            (msg: NotificationMarkAsReadRequest, ack: (count: number) => any) => void;
    }

    export interface InterServerNotificationsEvents extends Default.InterServerEvents {
    }
    
    export interface SocketNotificationsData extends Default.SocketData {
    }
    
    export type IONotificationsNamespace = Namespace<
        ClientToServerNotificationsEvents, 
        ServerToClientNotificationsEvents,
        InterServerNotificationsEvents, 
        SocketNotificationsData >;

    export type IONotificationsSocket = Socket<
        ClientToServerNotificationsEvents, 
        ServerToClientNotificationsEvents,
        InterServerNotificationsEvents, 
        SocketNotificationsData>;
}

// Main namepsace
export namespace MainNsp {
    export interface ServerToClientEvents extends NotificationsNsp.ServerToClientNotificationsEvents {
    }
      
    export interface ClientToServerEvents extends NotificationsNsp.ClientToServerNotificationsEvents {
    }
    
    export interface InterServerEvents extends NotificationsNsp.InterServerNotificationsEvents {
    }
    
    export interface SocketData extends NotificationsNsp.SocketNotificationsData {
    }
    
    export type IOServer = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
    export type IOSocket = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
}

// Type aliases for convenience
export type IOServer = MainNsp.IOServer;
export type IOSocket = MainNsp.IOSocket;