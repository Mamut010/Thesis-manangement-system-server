import { NotificationsQueryRequest } from "../../contracts/requests/notifications-query.request";

export interface NotificationUpdateManyFilter {
    queryRequest?: NotificationsQueryRequest,
    receiverId?: string | string[],
}