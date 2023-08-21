import { inject, injectable } from "inversify";
import { NotificationRepoInterface } from "../interfaces";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { PlainTransformerInterface } from "../../shared/utils/plain-transformer";
import { AutoQueryCreatable, PrismaQueryCreatorInterface } from "../../lib/query";
import { NotificationCreateRequest } from "../../contracts/requests/notification-create.request";
import { NotificationsQueryRequest } from "../../contracts/requests/notifications-query.request";
import { NotificationsQueryResponse } from "../../contracts/responses/notifications-query.response";
import { NotificationDto } from "../../shared/dtos";
import { Notification } from "../../core/models";
import { NotificationUpdateRequest } from "../../contracts/requests/notification-update.request";
import { NotificationUpdateManyFilter } from "../types/notification";
import { isObjectEmptyOrAllUndefined } from "../../utils/object-helpers";

@injectable()
export class NotificationRepo implements NotificationRepoInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface) {

    }

    async querySent(userId: string, queryRequest: NotificationsQueryRequest): Promise<NotificationsQueryResponse | null> {
        return await this.query(userId, queryRequest, 'sent');
    }

    async queryReceived(userId: string, queryRequest: NotificationsQueryRequest): Promise<NotificationsQueryResponse | null> {
        return await this.query(userId, queryRequest, 'received');
    }

    async create(createRequest: NotificationCreateRequest): Promise<NotificationDto> {
        const connect: { userId: string }[] | undefined = [];
        createRequest.receiverIds?.forEach(item => connect.push({ userId: item }));

        const record = await this.prisma.notification.create({
            data: {
                senderId: createRequest.senderId,
                title: createRequest.title,
                content: createRequest.content,
                receivers: connect.length > 0 ? { connect: connect } : undefined,
            }
        });

        return this.plainTransformer.toNotification(record);
    }

    async updateMany(ids: number[], updateRequest: NotificationUpdateRequest, filter?: NotificationUpdateManyFilter | undefined)
        : Promise<number> {
        if (isObjectEmptyOrAllUndefined(updateRequest) || ids.length === 0) {
            return 0;
        }

        const prismaQuery = filter?.queryRequest ? this.createPrismaQuery(filter?.queryRequest) : undefined;
        let receivers: string[] = [];
        if (typeof filter?.receiverId !== 'undefined') {
            receivers = Array.isArray(filter.receiverId) ? filter.receiverId : [filter.receiverId];
        }

        const { count } = await this.prisma.notification.updateMany({
            data: updateRequest,
            where: {
                id: {
                    in: ids
                },
                ...prismaQuery?.where,
                receivers: {
                    some: {
                        userId: {
                            in: receivers
                        }
                    }
                }
            }
        });

        return count;
    }

    private async query(userId: string, queryRequest: NotificationsQueryRequest, type: 'sent' | 'received') {
        const prismaQuery = this.createPrismaQuery(queryRequest);

        const record = await this.prisma.user.findUnique({
            where: { userId },
            select: {
                sentNotifications: type === 'sent' ? prismaQuery : undefined,
                receivedNotifications: type === 'received' ? prismaQuery : undefined,
                _count: { 
                    select: { 
                        sentNotifications: type === 'sent' ? { where: prismaQuery.where } : undefined,
                        receivedNotifications: type === 'received' ? { where: prismaQuery.where } : undefined,
                    }
                },
            }
        });
        if (!record) {
            return null;
        }

        const response = new NotificationsQueryResponse();
        if (type === 'sent') {
            response.content = record.sentNotifications.map(item => this.plainTransformer.toNotification(item));
            response.count = record._count.sentNotifications;
        }
        else {
            response.content = record.receivedNotifications.map(item => this.plainTransformer.toNotification(item));
            response.count = record._count.receivedNotifications;
        }

        return response;
    }

    private createPrismaQuery(queryRequest: AutoQueryCreatable) {
        const model = this.queryCreator.createQueryModel(Notification);
        return this.queryCreator.createQueryObject(model, queryRequest);
    }
}