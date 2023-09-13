import { ActionHandlerInput, ActionHandlerOutput } from "../types";
import { BaseActionHandler } from "./base-action-handler";
import { RequestDataRepoInterface } from "../../../../../dal/interfaces";
import { WorkflowRequestDataProcessorInterface } from "../../request-data-processor";
import { upsertRequestData } from "../../utils/request-data-helpers";

export abstract class BaseInviteActionHandler extends BaseActionHandler {
    constructor(
        protected requestDataRepo: RequestDataRepoInterface,
        protected requestDataProcessor: WorkflowRequestDataProcessorInterface,
        protected dataKey: string) {
        super();
    }

    async handle(requestId: string, actionInput: ActionHandlerInput): Promise<ActionHandlerOutput> {
        const dataValue = this.getInputDataStringValue(actionInput, this.dataKey);
        const handlerOutput = await this.sendInvitation(requestId, dataValue, actionInput);
        await upsertRequestData(requestId, this.dataKey, dataValue, {
            repo: this.requestDataRepo,
            processor: this.requestDataProcessor,
        })
        return handlerOutput;
    }

    protected abstract sendInvitation(requestId: string, dataValue: string, actionInput: ActionHandlerInput): Promise<ActionHandlerOutput>;
}