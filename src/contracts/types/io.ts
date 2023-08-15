import { Server, Socket } from "socket.io";
import { AuthorizedUser } from "../../core/auth-checkers";
import { NotificationDto } from "../../shared/dtos";
import { NotificationMarkAsReadRequest } from "../requests/notification-mark-as-read.request";
import { CLIENT_TO_SERVER_EVENTS, SERVER_TO_CLIENT_EVENTS } from "../constants/io";

export interface ServerToClientEvents {
    [SERVER_TO_CLIENT_EVENTS.Notification.Received]: (dto: NotificationDto) => void;
}
  
export interface ClientToServerEvents {
    [CLIENT_TO_SERVER_EVENTS.Notification.MarkAsRead]: 
        (msg: NotificationMarkAsReadRequest, ack: (count: number) => any) => void;
}

export interface InterServerEvents {
}

export interface SocketData {
    user: AuthorizedUser;
    token: string;
}

export type IOServer = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
export type IOSocket = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;