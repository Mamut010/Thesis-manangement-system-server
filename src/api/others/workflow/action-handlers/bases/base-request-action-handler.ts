import { ActionHandlerInput, ActionHandlerOutput } from "../types";
import { BaseActionHandler } from "./base-action-handler";
import { RequestDataRepoInterface } from "../../../../../dal/interfaces";
import { WorkflowRequestDataProcessorInterface } from "../../request-data-processor";

export abstract class BaseRequestActionHandler extends BaseActionHandler {
    constructor(
        protected requestDataRepo: RequestDataRepoInterface,
        protected requestDataProcessor: WorkflowRequestDataProcessorInterface,
        protected dataKey: string) {
        super();
    }

    async handle(requestId: string, actionInput: ActionHandlerInput): Promise<ActionHandlerOutput> {
        const dataValue = this.getInputDataStringValue(actionInput, this.dataKey);
        const handlerOutput = await this.sendRequest(dataValue, actionInput);
        await this.updateRequestData(requestId, dataValue, actionInput);
        return handlerOutput;
    }

    protected abstract sendRequest(dataValue: string, actionInput: ActionHandlerInput): Promise<ActionHandlerOutput>;

    private async updateRequestData(requestId: string, dataValue: string, actionInput: ActionHandlerInput) {
        await this.requestDataRepo.upsert(requestId, {
            name: this.dataKey,
            value: this.requestDataProcessor.makeStoredValue(dataValue)
        });
    }
}