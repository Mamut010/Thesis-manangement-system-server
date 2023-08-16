import { Namespace, Server, Socket } from "socket.io";
import { AuthorizedUser } from "../../core/auth-checkers";
import { NotificationDto } from "../../shared/dtos";
import { NotificationMarkAsReadRequest } from "../requests/notification-mark-as-read.request";
import { CLIENT_TO_SERVER_EVENTS, SERVER_TO_CLIENT_EVENTS } from "../constants/io";

// Specific namespaces
export namespace NotificationsNsp {
    export interface ServerToClientNotificationsEvents {
        [SERVER_TO_CLIENT_EVENTS.Notifications.Received]: 
            (dto: NotificationDto) => void;
    }
      
    export interface ClientToServerNotificationsEvents {
        [CLIENT_TO_SERVER_EVENTS.Notifications.MarkAsRead]: 
            (msg: NotificationMarkAsReadRequest, ack: (count: number) => any) => void;
    }

    export interface InterServerNotificationsEvents {
    }
    
    export interface SocketNotificationsData {
        user: AuthorizedUser;
        token: string;
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

// Final main namepsace
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