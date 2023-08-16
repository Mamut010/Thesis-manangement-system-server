import { inject, injectable } from "inversify";
import { ConnectedSocket, MessageAck, MessageBody, OnMessage, SocketController } from "socket-controllers";
import { IO_NAMESPACES } from "../constants/io-namespaces";
import { BaseSocketController } from "../bases/base.controller";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { NotificationServiceInterface } from "../../shared/interfaces";
import { WsSetupServiceInterface } from "../interfaces";
import { CLIENT_TO_SERVER_EVENTS } from "../../contracts/constants/io";
import { IOSocket } from "../../contracts/types/io";
import { NotificationMarkAsReadRequest } from "../../contracts/requests/notification-mark-as-read.request";

@SocketController(IO_NAMESPACES.Notifications)
@injectable()
export class NotificationController extends BaseSocketController {
    constructor(
        @inject(INJECTION_TOKENS.WsSetupService) wsSetupService: WsSetupServiceInterface,
        @inject(INJECTION_TOKENS.NotificationService) private notificationService: NotificationServiceInterface) {
        super(wsSetupService);
    }

    @OnMessage(CLIENT_TO_SERVER_EVENTS.Notifications.MarkAsRead)
    async markAsRead(@ConnectedSocket() socket: IOSocket, @MessageBody() msg: NotificationMarkAsReadRequest, 
        @MessageAck() ack: (count: number) => any) {
        await this.notificationService.markAsRead(socket.data.user.userId, msg.ids, ack);
    }
}