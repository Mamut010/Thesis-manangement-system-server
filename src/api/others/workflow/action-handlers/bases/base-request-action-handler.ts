import { ActionHandlerInput, ActionHandlerOutput } from "../types";
import { BaseActionHandler } from "./base-action-handler";
import { RequestDataRepoInterface } from "../../../../../dal/interfaces";
import { WorkflowRequestDataProcessorInterface } from "../../request-data-processor";
import { getRequestDataStringValueByKey, upsertRequestData } from "../../utils/request-data-helpers";

export abstract class BaseRequestActionHandler extends BaseActionHandler {
    constructor(
        protected requestDataRepo: RequestDataRepoInterface,
        protected requestDataProcessor: WorkflowRequestDataProcessorInterface,
        protected dataKey: string) {
        super();
    }

    async handle(requestId: string, actionInput: ActionHandlerInput): Promise<ActionHandlerOutput> {
        const dataValue = await this.getDataValue(requestId, actionInput);
        const handlerOutput = await this.sendRequest(dataValue, actionInput);
        await upsertRequestData(requestId, this.dataKey, dataValue, this.makeRequestDataDeps());
        return handlerOutput;
    }

    protected abstract sendRequest(dataValue: string, actionInput: ActionHandlerInput): Promise<ActionHandlerOutput>;

    private async getDataValue(requestId: string, actionInput: ActionHandlerInput) {
        // Try to get data value from stored request data
        const requestData = await getRequestDataStringValueByKey(requestId, this.dataKey, this.makeRequestDataDeps());
        // Return the data value if already stored; otherwise, get directly from input data
        return requestData ?? this.getInputDataStringValue(actionInput, this.dataKey);
    }

    private makeRequestDataDeps() {
        return {
            repo: this.requestDataRepo, 
            processor: this.requestDataProcessor
        }
    }
}