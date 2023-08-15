import { Server, Socket } from "socket.io";
import { AuthorizedUser } from "../../core/auth-checkers";
import { NotificationDto } from "../../shared/dtos";
import { NotificationMarkAsReadRequest } from "../requests/notification-mark-as-read.request";

export interface ServerToClientEvents {
    ['notification:received']: (dto: NotificationDto) => void;
}
  
export interface ClientToServerEvents {
    ['notification:mark-as-read']: (msg: NotificationMarkAsReadRequest, ack: (count: number) => any) => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    user: AuthorizedUser;
}

export type IOServer = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
export type IOSocket = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;