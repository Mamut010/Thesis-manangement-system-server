import { NotificationsQueryRequest } from "../../contracts/requests/notifications-query.request";
import { NotificationsQueryResponse } from "../../contracts/responses/notifications-query.response";
import { NotificationDto } from "../dtos";
import { NotificationInfo } from "../types/notification";

export interface NotificationServiceInterface {
    getReceivedNotifications(userId: number, queryRequest: NotificationsQueryRequest)
        : Promise<NotificationsQueryResponse>;

    getSentNotifications(userId: number, queryRequest: NotificationsQueryRequest)
        : Promise<NotificationsQueryResponse>;
        
    sendNotification(notificationInfo: NotificationInfo): Promise<NotificationDto>;
    
    markAsRead(userId: number, ids: number[]): Promise<number>;
}