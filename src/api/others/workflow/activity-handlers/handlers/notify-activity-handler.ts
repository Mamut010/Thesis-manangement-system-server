import { PrismaClient } from "@prisma/client";
import { DEFAULTS } from "../../constants/defaults";
import { NotificationServiceInterface } from "../../../../../shared/interfaces";
import { stringFormat } from "../../../../../utils/string-helpers";
import { DEFAULT_FORMATS } from "../constants/default-formats";
import { ActivityHandlerInput } from "../types";
import { BaseNotifyActivityHandler } from "../bases/base-notify-activity-handler";

export class NotifyActivityHandler extends BaseNotifyActivityHandler {
    constructor(prisma: PrismaClient, private notificationService: NotificationServiceInterface) {
        super(prisma);
    }

    protected async execute(requestId: string, receiverIds: string[], activityInput: ActivityHandlerInput): Promise<void> {
        await Promise.all(receiverIds.map(async (receiverId) => {
            await this.notificationService.sendNotification({
                receiverId,
                title: DEFAULTS.Notification.Title,
                content: stringFormat(DEFAULT_FORMATS.Notification.Content, requestId)
            });
        }));
    }
}