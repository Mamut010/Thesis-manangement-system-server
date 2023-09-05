import { PrismaClient } from "@prisma/client";
import { ActionHandlerInput, ActionHandlerOutput } from "../types";
import { NotificationServiceInterface } from "../../../../../shared/interfaces";
import { getTitleAndContentFromData } from "../../utils/action-handler-helpers";
import { BaseRequestActionHandler } from "../bases/base-request-action-handler";

export class SimpleBaseRequestActionHandler extends BaseRequestActionHandler {
    constructor(prisma: PrismaClient, dataKey: string, private notificationService: NotificationServiceInterface) {
        super(prisma, dataKey);
    }

    protected async sendRequest(dataValue: string, actionInput: ActionHandlerInput): Promise<ActionHandlerOutput> {
        await this.notificationService.sendNotification({
            senderId: actionInput.actionerId,
            receiverId: dataValue,
            ...getTitleAndContentFromData(actionInput.data),
        });

        return {
            requestUsersInfo: actionInput.requestUsersInfo,
            resolvedUserIds: [actionInput.actionerId, dataValue]
        }
    }
}