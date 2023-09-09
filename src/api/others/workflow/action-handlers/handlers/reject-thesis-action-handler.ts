import { STORED_REQUEST_DATA_KEYS } from "../../constants/request-data-keys";
import { ActionHandlerInput, ActionHandlerOutput } from "../types";
import { BaseActionHandler } from "../bases/base-action-handler";
import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../../../core/constants/injection-tokens";
import { RequestDataRepoInterface } from "../../../../../dal/interfaces";

@injectable()
export class RejectThesisActionHandler extends BaseActionHandler {
    constructor(@inject(INJECTION_TOKENS.RequestDataRepo) private requestDataRepo: RequestDataRepoInterface) {
        super();
    }

    async handle(requestId: string, actionInput: ActionHandlerInput): Promise<ActionHandlerOutput> {
        await this.requestDataRepo.deleteOneByRequestIdAndName({
            requestId: requestId,
            name: STORED_REQUEST_DATA_KEYS.Thesis
        });

        return {
            requestUsers: actionInput.requestUsers,
            resolvedUserIds: [actionInput.actionerId],
        };
    }
}