import { NotificationsQueryRequest } from "../../contracts/requests";

export interface NotificationUpdateManyFilter {
    queryRequest?: NotificationsQueryRequest,
    receiverId?: string | string[],
}