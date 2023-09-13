import { STORED_REQUEST_DATA_KEYS } from "../../constants/request-data-keys";
import { ActionHandlerInput, ActionHandlerOutput } from "../types";
import { BaseActionHandler } from "../bases/base-action-handler";
import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../../../core/constants/injection-tokens";
import { RequestDataRepoInterface, ThesisRepoInterface } from "../../../../../dal/interfaces";
import { WorkflowRequestDataProcessorInterface } from "../../request-data-processor";
import { getRequestDataValueByKey } from "../../utils/request-data-helpers";
import { NotificationServiceInterface } from "../../../../../shared/interfaces";
import { DEFAULTS } from "../../constants/defaults";
import { stringFormat } from "../../../../../utils/string-helpers";
import { DEFAULT_FORMATS } from "../../constants/default-formats";

@injectable()
export class ConfirmThesisActionHandler extends BaseActionHandler {
    constructor(
        @inject(INJECTION_TOKENS.RequestDataRepo) private requestDataRepo: RequestDataRepoInterface,
        @inject(INJECTION_TOKENS.ThesisRepo) private thesisRepo: ThesisRepoInterface,
        @inject(INJECTION_TOKENS.WorkflowRequestDataProcessor) private requestDataProcessor: WorkflowRequestDataProcessorInterface,
        @inject(INJECTION_TOKENS.NotificationService) private notificationService: NotificationServiceInterface) {
        super();
    }

    async handle(requestId: string, actionInput: ActionHandlerInput): Promise<ActionHandlerOutput> {
        const thesisId = await getRequestDataValueByKey(requestId, STORED_REQUEST_DATA_KEYS.Thesis, {
            repo: this.requestDataRepo, 
            processor: this.requestDataProcessor,
        });

        if (typeof thesisId !== 'number') {
            return this.defaultOutput(actionInput);
        }

        const thesis = await this.thesisRepo.findOneById(thesisId);
        if (thesis === null) {
            return this.defaultOutput(actionInput);
        }
    
        await this.requestDataRepo.create(requestId, {
            name: STORED_REQUEST_DATA_KEYS.Supervisor1,
            value: this.requestDataProcessor.makeStoredValue(thesis.creatorId)
        });

        await this.notificationService.sendNotification({
            receiverId: thesis.creatorId,
            title: DEFAULTS.Notification.Title,
            content: stringFormat(DEFAULT_FORMATS.Action.ConfirmThesis.Content, actionInput.actionerId, thesis.title),
        });

        return {
            requestUsers: actionInput.requestUsers,
            resolvedUserIds: [actionInput.actionerId]
        };
    }
}