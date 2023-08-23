import { NotificationCreateRequest } from "../../contracts/requests";
import { NotificationUpdateRequest } from "../../contracts/requests";
import { NotificationsQueryRequest } from "../../contracts/requests";
import { NotificationsQueryResponse } from "../../contracts/responses";
import { NotificationDto } from "../../shared/dtos";
import { NotificationUpdateManyFilter } from "../types/notification";

export interface NotificationRepoInterface {
    querySent(userId: string, queryRequest: NotificationsQueryRequest): Promise<NotificationsQueryResponse | null>;
    queryReceived(userId: string, queryRequest: NotificationsQueryRequest): Promise<NotificationsQueryResponse | null>;
    create(createRequest: NotificationCreateRequest): Promise<NotificationDto>;
    updateMany(ids: number[], updateRequest: NotificationUpdateRequest, filter?: NotificationUpdateManyFilter): Promise<number>;
}