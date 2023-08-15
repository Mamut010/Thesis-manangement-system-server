import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { IOServer } from "../../contracts/types/io";
import { IO_NAMESPACES } from "../../ws/constants/io-namespaces";
import { NotificationInfo } from "../types/notification";
import { NotificationServiceInterface } from "../interfaces";
import { WsSetupServiceInterface } from "../../ws/interfaces";
import { PlainTransformerInterface } from "../utils/plain-transformer";
import { NotificationDto } from "../dtos";
import { NotificationsQueryResponse } from "../../contracts/responses/notifications-query.response";
import { NotificationsQueryRequest } from "../../contracts/requests/notifications-query.request";
import { PrismaQueryCreatorInterface } from "../../lib/query";
import { Notification } from "../../core/models";

@injectable()
export class NotificationService implements NotificationServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface,
        @inject(INJECTION_TOKENS.IOServer) private io: IOServer,
        @inject(INJECTION_TOKENS.WsSetupService) private wsSetupService: WsSetupServiceInterface) {

    }

    async getReceivedNotifications(userId: number, queryRequest: NotificationsQueryRequest)
        : Promise<NotificationsQueryResponse> {
        return this.getNotifications(userId, queryRequest, 'received');
    }

    async getSentNotifications(userId: number, queryRequest: NotificationsQueryRequest)
        : Promise<NotificationsQueryResponse> {
        return this.getNotifications(userId, queryRequest, 'sent');
    }

    async sendNotification(notificationInfo: NotificationInfo): Promise<NotificationDto> {
        await this.ensureUsersExists(notificationInfo.receiverId, notificationInfo.senderId);
        
        const notification = await this.prisma.notification.create({
            data: {
                senderId: notificationInfo.senderId,
                receivers: {
                    connect: {
                        userId: notificationInfo.receiverId
                    }
                },
                title: notificationInfo.title,
                content: notificationInfo.content
            }
        });

        const dto = this.plainTransformer.toNotification(notification);

        this.io
            .of(IO_NAMESPACES.Notifications)
            .to(this.wsSetupService.getRoom(notificationInfo.receiverId))
            .emit('notification:received', dto);

        return dto;
    }

    async markAsRead(userId: number, ids: number[], ack: (count: number) => any): Promise<number> {
        const notifications = await this.prisma.notification.updateMany({
            where: {
                id: {
                    in: ids
                },
                receivers: {
                    some: {
                        userId: userId
                    }
                }
            },
            data: {
                isRead: true
            }
        });

        ack(notifications.count);

        return notifications.count;
    }

    private async ensureUsersExists(...userIds: (number | undefined)[]) {
        const ids = userIds.filter((id: number | null | undefined): id is number => typeof id === 'number');
        const users = await this.prisma.user.findMany({ where: { userId: { in: ids } } });
        if (users.length !== ids.length) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.UserNotFound);
        }
        
        return users;
    }

    private async getNotifications(userId: number, queryRequest: NotificationsQueryRequest, type: 'sent' | 'received') {
        const model = this.queryCreator.createQueryModel(Notification);
        const prismaQuery = this.queryCreator.createQueryObject(model, queryRequest);

        const userWithCounts = await this.prisma.user.findUnique({
            where: { userId },
            select: { _count: { select: { 
                sentNotifications: type === 'sent' ? { where: prismaQuery.where } : undefined,
                receivedNotifications: type === 'received' ? { where: prismaQuery.where } : undefined,
            } } }
        });

        if (!userWithCounts) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.UserNotFound);
        }

        const userWithRecords = await this.prisma.user.findUniqueOrThrow({
            where: { userId },
            select: { 
                sentNotifications: type === 'sent' ? prismaQuery : undefined,
                receivedNotifications: type === 'received' ? prismaQuery : undefined,
            }
        });

        const response = new NotificationsQueryResponse();
        if (type === 'sent') {
            response.content = userWithRecords.sentNotifications.map(this.plainTransformer.toNotification);
            response.count = userWithCounts._count.sentNotifications;
        }
        else {
            response.content = userWithRecords.receivedNotifications.map(this.plainTransformer.toNotification);
            response.count = userWithCounts._count.receivedNotifications;
        }

        return response;
    }
}