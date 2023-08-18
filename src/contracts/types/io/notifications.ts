import { Namespace, Socket } from "socket.io";
import { NotificationDto } from "../../../shared/dtos";
import { CLIENT_TO_SERVER_EVENTS, SERVER_TO_CLIENT_EVENTS } from "../../constants/io";
import { NotificationMarkAsReadRequest } from "../../requests/notification-mark-as-read.request";
import { 
    ClientToServerDefaultEvents, 
    InterServerDefaultEvents, 
    ServerToClientDefaultEvents, 
    SocketDefaultData 
} from "./default";

export interface ServerToClientNotificationsEvents extends ServerToClientDefaultEvents {
    [SERVER_TO_CLIENT_EVENTS.Notifications.Received]: 
        (dto: NotificationDto) => void;
    [SERVER_TO_CLIENT_EVENTS.Notifications.MarkAsReadFinished]:
        (count: number) => void;
}
  
export interface ClientToServerNotificationsEvents extends ClientToServerDefaultEvents {
    [CLIENT_TO_SERVER_EVENTS.Notifications.MarkAsRead]: 
        (msg: NotificationMarkAsReadRequest) => void;
}

export interface InterServerNotificationsEvents extends InterServerDefaultEvents {
}

export interface SocketNotificationsData extends SocketDefaultData {
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