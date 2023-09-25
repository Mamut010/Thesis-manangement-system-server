import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../../../core/constants/injection-tokens";
import { NotificationServiceInterface } from "../../../../../shared/interfaces";
import { WorkflowRequestDataProcessorInterface } from "../../request-data-processor";
import { RequestDataRepoInterface, ThesisRepoInterface, UserRepoInterface } from "../../../../../dal/interfaces";
import { ActionHandlerInput, ActionHandlerOutput } from "../types";
import { BaseInviteActionHandler } from "../bases/base-invite-action-handler";
import { STORED_REQUEST_DATA_KEYS } from "../../constants/request-data-keys";
import { DEFAULTS } from "../../constants/defaults";
import { DEFAULT_FORMATS } from "../../constants/default-formats";
import { stringFormat } from "../../../../../utils/string-helpers";
import { getRequestDataStringValueByKey, getRequestDataValueByKey } from "../../utils/request-data-helpers";
import { Target } from "../../types/targets";
import { KeyValuePair } from "../../types/utility-types";
import { singleOrThrow } from "../../../../../utils/array-helpers";
import { BadRequestError } from "../../../../../contracts/errors/bad-request.error";
import { ERROR_MESSAGES } from "../../../../../contracts/constants/error-messages";
import { NotFoundError } from "../../../../../contracts/errors/not-found.error";
import { LecturerRoles } from "../../../../../core/constants/roles";
import { UnexpectedError } from "../../../../../contracts/errors/unexpected.error";

@injectable()
export class InviteSupervisor2ActionHandler extends BaseInviteActionHandler {
    constructor(
        @inject(INJECTION_TOKENS.RequestDataRepo) requestDataRepo: RequestDataRepoInterface,
        @inject(INJECTION_TOKENS.WorkflowRequestDataProcessor) requestDataProcessor: WorkflowRequestDataProcessorInterface,
        @inject(INJECTION_TOKENS.ThesisRepo) private thesisRepo: ThesisRepoInterface,
        @inject(INJECTION_TOKENS.UserRepo) private userRepo: UserRepoInterface,
        @inject(INJECTION_TOKENS.NotificationService) private notificationService: NotificationServiceInterface) {
        super(requestDataRepo, requestDataProcessor, STORED_REQUEST_DATA_KEYS.Supervisor2);
    }

    protected async sendInvitation(requestId: string, dataKeyValuePairs: KeyValuePair<string>[], 
        actionInput: ActionHandlerInput): Promise<ActionHandlerOutput> {
        const inviteeId = await this.ensureValidInvitation(requestId, dataKeyValuePairs, actionInput);
        const thesisId = await getRequestDataValueByKey(requestId, STORED_REQUEST_DATA_KEYS.Thesis, this.makeRequestDataDeps());
        
        let thesisTitle = String(thesisId);
        if (typeof thesisId === 'number') {
            const thesis = await this.thesisRepo.findOneById(thesisId);
            thesisTitle = thesis?.title ?? thesisTitle;
        }

        const inviterRole = actionInput.target === Target.Requester ? 'Student' : 'Lecturer';

        await this.notificationService.sendNotification({
            senderId: actionInput.actionerId,
            receiverId: inviteeId,
            title: DEFAULTS.Notification.Title,
            content: stringFormat(DEFAULT_FORMATS.Action.InviteSupervisor2.Content, inviterRole, actionInput.actionerId, 
                thesisTitle),
        });

        return {
            requestUsers: actionInput.requestUsers,
            resolvedUserIds: [actionInput.actionerId, inviteeId]
        }
    }

    private async ensureValidInvitation(requestId: string, dataKeyValuePairs: KeyValuePair<string>[], 
        actionInput: ActionHandlerInput) {
        const supervisor1Id = await getRequestDataStringValueByKey(requestId, STORED_REQUEST_DATA_KEYS.Supervisor1,
            this.makeRequestDataDeps());
        if (typeof supervisor1Id !== 'string') {
            throw new UnexpectedError(ERROR_MESSAGES.Unexpected.MissingRequiredStringRequestData);
        }

        const inviteeId = singleOrThrow(dataKeyValuePairs).value;
        if (inviteeId === supervisor1Id) {
            throw new BadRequestError(ERROR_MESSAGES.Invalid.Supervisor2MustNotBeSupervisor1);
        }

        const invitee = await this.userRepo.findOneById(inviteeId);
        if (!invitee || !LecturerRoles.find(role => role === invitee.roleName)) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.LecturerNotFound);
        }

        return inviteeId;
    }
}