import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../../../core/constants/injection-tokens";
import { NotificationServiceInterface } from "../../../../../shared/interfaces";
import { WorkflowRequestDataProcessorInterface } from "../../request-data-processor";
import { RequestDataRepoInterface, ThesisRepoInterface } from "../../../../../dal/interfaces";
import { ActionHandlerInput, ActionHandlerOutput } from "../types";
import { BaseInviteActionHandler } from "../bases/base-invite-action-handler";
import { STORED_REQUEST_DATA_KEYS } from "../../constants/request-data-keys";
import { DEFAULTS } from "../../constants/defaults";
import { DEFAULT_FORMATS } from "../../constants/default-formats";
import { stringFormat } from "../../../../../utils/string-helpers";
import { getRequestDataValueByKey } from "../../utils/request-data-helpers";
import { Target } from "../../types/targets";

@injectable()
export class InviteSupervisor2ActionHandler extends BaseInviteActionHandler {
    constructor(
        @inject(INJECTION_TOKENS.RequestDataRepo) requestDataRepo: RequestDataRepoInterface,
        @inject(INJECTION_TOKENS.WorkflowRequestDataProcessor) requestDataProcessor: WorkflowRequestDataProcessorInterface,
        @inject(INJECTION_TOKENS.ThesisRepo) private thesisRepo: ThesisRepoInterface,
        @inject(INJECTION_TOKENS.NotificationService) private notificationService: NotificationServiceInterface) {
        super(requestDataRepo, requestDataProcessor, STORED_REQUEST_DATA_KEYS.Supervisor2);
    }

    protected async sendInvitation(requestId: string, dataValue: string, actionInput: ActionHandlerInput): Promise<ActionHandlerOutput> {
        const thesisId = await getRequestDataValueByKey(requestId, STORED_REQUEST_DATA_KEYS.Thesis, {
            repo: this.requestDataRepo,
            processor: this.requestDataProcessor,
        });
        
        let thesisTitle = String(thesisId);
        if (typeof thesisId === 'number') {
            const thesis = await this.thesisRepo.findOneById(thesisId);
            thesisTitle = thesis?.title ?? thesisTitle;
        }

        const role = actionInput.target === Target.Requester ? 'Student' : 'Lecturer';

        await this.notificationService.sendNotification({
            senderId: actionInput.actionerId,
            receiverId: dataValue,
            title: DEFAULTS.Notification.Title,
            content: stringFormat(DEFAULT_FORMATS.Action.InviteSupervisor2.Content, role, actionInput.actionerId, thesisTitle),
        });

        return {
            requestUsers: actionInput.requestUsers,
            resolvedUserIds: [actionInput.actionerId, dataValue]
        }
    }
}