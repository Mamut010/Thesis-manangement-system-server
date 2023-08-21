import { NotificationCreateRequest } from "../../contracts/requests/notification-create.request";
import { NotificationUpdateRequest } from "../../contracts/requests/notification-update.request";
import { NotificationsQueryRequest } from "../../contracts/requests/notifications-query.request";
import { NotificationsQueryResponse } from "../../contracts/responses/notifications-query.response";
import { NotificationDto } from "../../shared/dtos";
import { NotificationUpdateManyFilter } from "../types/notification";

export interface NotificationRepoInterface {
    querySent(userId: string, queryRequest: NotificationsQueryRequest): Promise<NotificationsQueryResponse | null>;
    queryReceived(userId: string, queryRequest: NotificationsQueryRequest): Promise<NotificationsQueryResponse | null>;
    create(createRequest: NotificationCreateRequest): Promise<NotificationDto>;
    updateMany(ids: number[], updateRequest: NotificationUpdateRequest, filter?: NotificationUpdateManyFilter): Promise<number>;
}