import { NotificationServiceInterface } from "../../../../../shared/interfaces";
import { getTitleAndContentFromData } from "../../utils/action-handler-helpers";
import { ActionHandlerInput, ActionHandlerOutput } from "../types";
import { BaseActionHandler } from "../bases/base-action-handler";
import { removeDuplicates } from "../../../../../utils/array-helpers";

export class InformRequesterActionHandler extends BaseActionHandler {
    constructor(private notificationService: NotificationServiceInterface) {
        super();
    }

    async handle(requestId: string, actionInput: ActionHandlerInput): Promise<ActionHandlerOutput> {
        await this.notificationService.sendNotification({
            senderId: actionInput.actionerId,
            receiverId: actionInput.requestUsers.requesterId,
            ...getTitleAndContentFromData(actionInput.data),
        });

        return {
            requestUsers: actionInput.requestUsers,
            resolvedUserIds: removeDuplicates([actionInput.actionerId, actionInput.requestUsers.requesterId]),
        }
    }
}