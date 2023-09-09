import { ActionHandlerInput, ActionHandlerOutput } from "../types";
import { BaseRequestActionHandler } from "../bases/base-request-action-handler";
import { NotificationServiceInterface } from "../../../../../shared/interfaces";
import { STORED_REQUEST_DATA_KEYS } from "../../constants/request-data-keys";
import { NotFoundError } from "../../../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../../../contracts/constants/error-messages";
import { getTitleAndContentFromData } from "../../utils/action-handler-helpers";
import { removeDuplicates } from "../../../../../utils/array-helpers";
import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../../../core/constants/injection-tokens";
import { GroupRepoInterface, RequestDataRepoInterface } from "../../../../../dal/interfaces";

@injectable()
export class RequestAdminGroupActionHandler extends BaseRequestActionHandler {
    constructor(
        @inject(INJECTION_TOKENS.RequestDataRepo) requestDataRepo: RequestDataRepoInterface,
        @inject(INJECTION_TOKENS.GroupRepo) private groupRepo: GroupRepoInterface,
        @inject(INJECTION_TOKENS.NotificationService) private notificationService: NotificationServiceInterface) {
        super(requestDataRepo, STORED_REQUEST_DATA_KEYS.AdminGroup);
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