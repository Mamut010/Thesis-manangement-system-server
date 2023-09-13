import { ActionHandlerInput, ActionHandlerOutput } from "../types";
import { BaseRequestActionHandler } from "../bases/base-request-action-handler";
import { NotificationServiceInterface } from "../../../../../shared/interfaces";
import { NotFoundError } from "../../../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../../../contracts/constants/error-messages";
import { getTitleAndContentFromData } from "../../utils/action-handler-helpers";
import { removeDuplicates } from "../../../../../utils/array-helpers";
import { GroupRepoInterface, RequestDataRepoInterface } from "../../../../../dal/interfaces";
import { WorkflowRequestDataProcessorInterface } from "../../request-data-processor";

export class GroupRequestActionHandler extends BaseRequestActionHandler {
    constructor(
        requestDataRepo: RequestDataRepoInterface,
        requestDataProcessor: WorkflowRequestDataProcessorInterface,
        dataKey: string,
        protected groupRepo: GroupRepoInterface,
        protected notificationService: NotificationServiceInterface) {
        super(requestDataRepo, requestDataProcessor, dataKey);
    }

    protected async sendRequest(dataValue: string, actionInput: ActionHandlerInput): Promise<ActionHandlerOutput> {
        const group = await this.groupRepo.findOneById(dataValue);
        if (!group) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.GroupNotFound);
        }

        await Promise.all(group.memberIds.map(userId => {
            return this.notificationService.sendNotification({
                senderId: actionInput.actionerId,
                receiverId: userId,
                ...getTitleAndContentFromData(actionInput.data),
            })
        }));

        return {
            requestUsers: actionInput.requestUsers,
            resolvedUserIds: removeDuplicates(group.memberIds.concat(actionInput.actionerId))
        };
    }
}