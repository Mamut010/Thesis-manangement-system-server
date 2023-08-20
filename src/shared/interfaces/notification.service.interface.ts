import { NotificationsQueryRequest } from "../../contracts/requests/notifications-query.request";
import { NotificationsQueryResponse } from "../../contracts/responses/notifications-query.response";
import { NotificationDto } from "../dtos";
import { NotificationInfo } from "../types/notification";

export interface NotificationServiceInterface {
    getReceivedNotifications(userId: string, queryRequest: NotificationsQueryRequest)
        : Promise<NotificationsQueryResponse>;

    getSentNotifications(userId: string, queryRequest: NotificationsQueryRequest)
        : Promise<NotificationsQueryResponse>;
        
    sendNotification(notificationInfo: NotificationInfo): Promise<NotificationDto>;
    
    markAsRead(userId: string, ids: number[]): Promise<number>;
}