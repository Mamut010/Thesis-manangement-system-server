import { ActionHandlerInput, ActionHandlerOutput } from "../types";
import { NotificationServiceInterface } from "../../../../../shared/interfaces";
import { getTitleAndContentFromData } from "../../utils/action-handler-helpers";
import { BaseRequestActionHandler } from "../bases/base-request-action-handler";
import { RequestDataRepoInterface } from "../../../../../dal/interfaces";
import { WorkflowRequestDataProcessorInterface } from "../../request-data-processor";
import { KeyValuePair } from "../../types/utility-types";
import { UnexpectedError } from "../../../../../contracts/errors/unexpected.error";
import { ERROR_MESSAGES } from "../../../../../contracts/constants/error-messages";

export class SimpleRequestActionHandler extends BaseRequestActionHandler {
    constructor(
        requestDataRepo: RequestDataRepoInterface,
        requestDataProcessor: WorkflowRequestDataProcessorInterface,
        dataKey: string | string[], 
        protected notificationService: NotificationServiceInterface) {
        super(requestDataRepo, requestDataProcessor, dataKey);
    }

    protected async sendRequest(requestId: string, dataKeyValuePairs: KeyValuePair<string | undefined>[], actionInput: ActionHandlerInput)
        : Promise<ActionHandlerOutput> {
        const receiverIds = dataKeyValuePairs.map(item => {
            if (typeof item.value === 'undefined') {
                throw new UnexpectedError(ERROR_MESSAGES.Unexpected.MissingRequiredStringRequestData);
            }
            return item.value;
        });

        await this.notificationService.sendNotification({
            senderId: actionInput.actionerId,
            receiverId: receiverIds,
            ...getTitleAndContentFromData(actionInput.data),
        });

        return {
            requestUsers: actionInput.requestUsers,
            resolvedUserIds: [actionInput.actionerId, ...receiverIds]
        }
    }
}