import { Server, Socket } from "socket.io";
import { 
    ClientToServerNotificationsEvents, 
    InterServerNotificationsEvents, 
    ServerToClientNotificationsEvents, 
    SocketNotificationsData 
} from "./notifications";

export interface ServerToClientEvents extends ServerToClientNotificationsEvents {
}
  
export interface ClientToServerEvents extends ClientToServerNotificationsEvents {
}

export interface InterServerEvents extends InterServerNotificationsEvents {
}

export interface SocketData extends SocketNotificationsData {
}

export type IOServer = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
export type IOSocket = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;