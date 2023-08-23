import { NotificationsQueryRequest } from "../../contracts/requests";
import { NotificationsQueryResponse } from "../../contracts/responses";
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