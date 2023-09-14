import { inject, injectable } from "inversify";
import { BaseInviteActionHandler } from "../bases/base-invite-action-handler";
import { INJECTION_TOKENS } from "../../../../../core/constants/injection-tokens";
import { GroupRepoInterface, RequestDataRepoInterface } from "../../../../../dal/interfaces";
import { WorkflowRequestDataProcessorInterface } from "../../request-data-processor";
import { STORED_REQUEST_DATA_KEYS } from "../../constants/request-data-keys";
import { NotificationServiceInterface } from "../../../../../shared/interfaces";
import { KeyValuePair } from "../../types/utility-types";
import { ActionHandlerInput, ActionHandlerOutput } from "../types";
import { removeDuplicates, singleOrThrow } from "../../../../../utils/array-helpers";
import { NotFoundError } from "../../../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../../../contracts/constants/error-messages";
import { getTitleAndContentFromData } from "../../utils/action-handler-helpers";

@injectable()
export class InformAdminGroupActionHandler extends BaseInviteActionHandler {
    constructor(
        @inject(INJECTION_TOKENS.RequestDataRepo) requestDataRepo: RequestDataRepoInterface,
        @inject(INJECTION_TOKENS.WorkflowRequestDataProcessor) requestDataProcessor: WorkflowRequestDataProcessorInterface,
        @inject(INJECTION_TOKENS.GroupRepo) private groupRepo: GroupRepoInterface,
        @inject(INJECTION_TOKENS.NotificationService) private notificationService: NotificationServiceInterface) {
        super(requestDataRepo, requestDataProcessor, STORED_REQUEST_DATA_KEYS.AdminGroup);
    }

    protected async sendInvitation(requestId: string, dataKeyValuePairs: KeyValuePair<string>[], actionInput: ActionHandlerInput)
        : Promise<ActionHandlerOutput> {
        const groupId = singleOrThrow(dataKeyValuePairs).value;
        const group = await this.groupRepo.findOneById(groupId);
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