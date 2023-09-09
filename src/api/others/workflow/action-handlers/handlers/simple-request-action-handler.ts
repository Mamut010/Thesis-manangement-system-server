import { ActionHandlerInput, ActionHandlerOutput } from "../types";
import { NotificationServiceInterface } from "../../../../../shared/interfaces";
import { getTitleAndContentFromData } from "../../utils/action-handler-helpers";
import { BaseRequestActionHandler } from "../bases/base-request-action-handler";
import { injectable } from "inversify";
import { RequestDataRepoInterface } from "../../../../../dal/interfaces";

@injectable()
export class SimpleRequestActionHandler extends BaseRequestActionHandler {
    constructor(
        requestDataRepo: RequestDataRepoInterface,
        dataKey: string, 
        private notificationService: NotificationServiceInterface) {
        super(requestDataRepo, dataKey);
    }

    protected async sendRequest(dataValue: string, actionInput: ActionHandlerInput): Promise<ActionHandlerOutput> {
        await this.notificationService.sendNotification({
            senderId: actionInput.actionerId,
            receiverId: dataValue,
            ...getTitleAndContentFromData(actionInput.data),
        });

        return {
            requestUsers: actionInput.requestUsers,
            resolvedUserIds: [actionInput.actionerId, dataValue]
        }
    }
}