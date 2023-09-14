import { ActionHandlerInput, ActionHandlerOutput } from "../types";
import { BaseRequestActionHandler } from "../bases/base-request-action-handler";
import { NotificationServiceInterface } from "../../../../../shared/interfaces";
import { NotFoundError } from "../../../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../../../contracts/constants/error-messages";
import { getTitleAndContentFromData } from "../../utils/action-handler-helpers";
import { removeDuplicates } from "../../../../../utils/array-helpers";
import { GroupRepoInterface, RequestDataRepoInterface } from "../../../../../dal/interfaces";
import { WorkflowRequestDataProcessorInterface } from "../../request-data-processor";
import { KeyValuePair } from "../../types/utility-types";
import { UnexpectedError } from "../../../../../contracts/errors/unexpected.error";

export class GroupRequestActionHandler extends BaseRequestActionHandler {
    constructor(
        requestDataRepo: RequestDataRepoInterface,
        requestDataProcessor: WorkflowRequestDataProcessorInterface,
        dataKey: string,
        protected groupRepo: GroupRepoInterface,
        protected notificationService: NotificationServiceInterface) {
        super(requestDataRepo, requestDataProcessor, dataKey);
    }

    protected async sendRequest(requestId: string, dataKeyValuePairs: KeyValuePair<string | undefined>[], actionInput: ActionHandlerInput)
        : Promise<ActionHandlerOutput> {
        const groupIds = dataKeyValuePairs.map(item => {
            if (typeof item.value === 'undefined') {
                throw new UnexpectedError(ERROR_MESSAGES.Unexpected.MissingRequiredStringRequestData);
            }
            return item.value;
        });

        const groups = await this.groupRepo.findManyByIds(groupIds);
        if (groups.length !== groupIds.length) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.GroupNotFound);
        }

        const userIds = groups.flatMap(item => item.memberIds);

        await Promise.all(userIds.map(userId => {
            return this.notificationService.sendNotification({
                senderId: actionInput.actionerId,
                receiverId: userId,
                ...getTitleAndContentFromData(actionInput.data),
            })
        }));

        return {
            requestUsers: actionInput.requestUsers,
            resolvedUserIds: removeDuplicates(userIds.concat(actionInput.actionerId))
        };
    }
}