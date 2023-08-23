import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { IO_NAMESPACES } from "../../ws/constants/io-namespaces";
import { NotificationInfo } from "../types/notification";
import { NotificationServiceInterface } from "../interfaces";
import { NotificationDto } from "../dtos";
import { NotificationsQueryResponse } from "../../contracts/responses";
import { NotificationsQueryRequest, NotificationCreateRequest } from "../../contracts/requests";
import { SERVER_TO_CLIENT_EVENTS } from "../../contracts/constants/io";
import { IONotificationsNamespace, IOServer } from "../../contracts/types/io";
import { RoomIdGeneratorInterface } from "../../ws/utils/room-id-generator";
import { NotificationRepoInterface, UserRepoInterface } from "../../dal/interfaces";
import { BooleanFilter } from "../../lib/query";
import { makeArray } from "../../utils/array-helpers";

@injectable()
export class NotificationService implements NotificationServiceInterface {
    private notificationsNsp: IONotificationsNamespace;

    constructor(
        @inject(INJECTION_TOKENS.NotificationRepo) private notificationRepo: NotificationRepoInterface,
        @inject(INJECTION_TOKENS.UserRepo) private userRepo: UserRepoInterface,
        @inject(INJECTION_TOKENS.RoomIdGenerator) private roomIdGenerator: RoomIdGeneratorInterface,
        @inject(INJECTION_TOKENS.IOServer) io: IOServer) {
        this.notificationsNsp = io.of(IO_NAMESPACES.Notifications);
    }

    async getReceivedNotifications(userId: string, queryRequest: NotificationsQueryRequest)
        : Promise<NotificationsQueryResponse> {
        const result = await this.notificationRepo.queryReceived(userId, queryRequest);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.UserNotFound);
        }

        return result;
    }

    async getSentNotifications(userId: string, queryRequest: NotificationsQueryRequest)
        : Promise<NotificationsQueryResponse> {
        const result = await this.notificationRepo.querySent(userId, queryRequest);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.UserNotFound);
        }

        return result;
    }

    async sendNotification(notificationInfo: NotificationInfo): Promise<NotificationDto> {
        await this.ensureUsersExists(...notificationInfo.receiverId, notificationInfo.senderId);

        const createRequest = new NotificationCreateRequest();
        createRequest.senderId = notificationInfo.senderId;
        createRequest.receiverIds = makeArray(notificationInfo.receiverId);
        createRequest.title = notificationInfo.title;
        createRequest.content = notificationInfo.content;

        const record = await this.notificationRepo.create(createRequest);
        const rooms = createRequest.receiverIds.map(item => this.roomIdGenerator.generate(item));

        this.notificationsNsp
            .to(rooms)
            .emit(SERVER_TO_CLIENT_EVENTS.Notifications.Received, record);

        return record;
    }

    async markAsRead(userId: string, ids: number[]): Promise<number> {
        const isReadFilter = new BooleanFilter();
        isReadFilter.value = false;
        const queryRequest = new NotificationsQueryRequest();
        queryRequest.isReadFilter = [isReadFilter];

        const count = await this.notificationRepo.updateMany(ids, { isRead: true }, { receiverId: userId, queryRequest } );
        return count;
    }

    private async ensureUsersExists(...userIds: (string | undefined)[]) {
        const ids = userIds.filter((id: string | null | undefined): id is string => typeof id === 'string'); 
        const users = await this.userRepo.findManyByIds(ids);
        if (users.length !== ids.length) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.UserNotFound);
        }
    }
}