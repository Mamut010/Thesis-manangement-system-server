import { inject, injectable } from "inversify";
import { ConnectedSocket, EmitOnSuccess, MessageBody, OnMessage, SocketController } from "socket-controllers";
import { IO_NAMESPACES } from "../constants/io-namespaces";
import { BaseSocketController } from "../bases/base.controller";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { NotificationServiceInterface } from "../../shared/interfaces";
import { WsSetupServiceInterface } from "../interfaces";
import { CLIENT_TO_SERVER_EVENTS, SERVER_TO_CLIENT_EVENTS } from "../../contracts/constants/io";
import { NotificationMarkAsReadRequest } from "../../contracts/requests/notification-mark-as-read.request";
import { IONotificationsSocket } from "../../contracts/types/io";

@SocketController(IO_NAMESPACES.Notifications)
@injectable()
export class NotificationController extends BaseSocketController {
    constructor(
        @inject(INJECTION_TOKENS.WsSetupService) wsSetupService: WsSetupServiceInterface,
        @inject(INJECTION_TOKENS.NotificationService) private notificationService: NotificationServiceInterface) {
        super(wsSetupService);
    }

    @OnMessage(CLIENT_TO_SERVER_EVENTS.Notifications.MarkAsRead)
    @EmitOnSuccess(SERVER_TO_CLIENT_EVENTS.Notifications.MarkAsReadFinished)
    async markAsRead(@ConnectedSocket() socket: IONotificationsSocket, @MessageBody() msg: NotificationMarkAsReadRequest) {
        return await this.notificationService.markAsRead(socket.data.user.userId, msg.ids);
    }
}