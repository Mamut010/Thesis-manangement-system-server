import { STORED_REQUEST_DATA_KEYS } from "../../constants/request-data-keys";
import { ActionHandlerInput, ActionHandlerOutput } from "../types";
import { BaseActionHandler } from "../bases/base-action-handler";
import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../../../core/constants/injection-tokens";
import { RequestDataRepoInterface } from "../../../../../dal/interfaces";
import { WorkflowRequestDataProcessorInterface } from "../../request-data-processor";

@injectable()
export class ApplyThesisActionHandler extends BaseActionHandler {
    constructor(
        @inject(INJECTION_TOKENS.RequestDataRepo) private requestDataRepo: RequestDataRepoInterface,
        @inject(INJECTION_TOKENS.WorkflowRequestDataProcessor) private requestDataProcessor: WorkflowRequestDataProcessorInterface) {
        super();
    }

    async handle(requestId: string, actionInput: ActionHandlerInput): Promise<ActionHandlerOutput> {
        const thesisId = this.getInputDataStringValue(actionInput, STORED_REQUEST_DATA_KEYS.Thesis);
        
        await this.requestDataRepo.create(requestId, {
            name: STORED_REQUEST_DATA_KEYS.Thesis,
            value: this.requestDataProcessor.makeStoredValue(thesisId)
        });

        return {
            requestUsers: actionInput.requestUsers,
            resolvedUserIds: [actionInput.actionerId]
        };
    }
}