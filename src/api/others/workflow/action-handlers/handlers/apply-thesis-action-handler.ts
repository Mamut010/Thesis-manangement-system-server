import { STORED_REQUEST_DATA_KEYS } from "../../constants/request-data-keys";
import { ActionHandlerInput, ActionHandlerOutput } from "../types";
import { BaseActionHandler } from "../bases/base-action-handler";
import { makeStoredDataValue } from "../../utils/request-data-helpers";
import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../../../core/constants/injection-tokens";
import { RequestDataRepoInterface } from "../../../../../dal/interfaces";

@injectable()
export class ApplyThesisActionHandler extends BaseActionHandler {
    constructor(@inject(INJECTION_TOKENS.RequestDataRepo) private requestDataRepo: RequestDataRepoInterface) {
        super();
    }

    async handle(requestId: string, actionInput: ActionHandlerInput): Promise<ActionHandlerOutput> {
        const thesisId = this.getInputDataStringValue(actionInput, STORED_REQUEST_DATA_KEYS.Thesis);
        
        await this.requestDataRepo.create(requestId, {
            name: STORED_REQUEST_DATA_KEYS.Thesis,
            value: makeStoredDataValue(thesisId)
        });

        return {
            requestUsers: actionInput.requestUsers,
            resolvedUserIds: [actionInput.actionerId]
        };
    }
}