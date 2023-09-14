import { ActionHandlerInput, ActionHandlerOutput } from "../types";
import { BaseActionHandler } from "./base-action-handler";
import { RequestDataRepoInterface } from "../../../../../dal/interfaces";
import { WorkflowRequestDataProcessorInterface } from "../../request-data-processor";
import { getRequestDataStringValueByKey, upsertRequestData } from "../../utils/request-data-helpers";
import { KeyValuePair } from "../../types/utility-types";
import { makeArray } from "../../../../../utils/array-helpers";

export abstract class BaseRequestActionHandler extends BaseActionHandler {
    constructor(
        protected requestDataRepo: RequestDataRepoInterface,
        protected requestDataProcessor: WorkflowRequestDataProcessorInterface,
        protected dataKey: string | string[]) {
        super();
    }

    async handle(requestId: string, actionInput: ActionHandlerInput): Promise<ActionHandlerOutput> {
        const dataKeyValuePairs = await this.getDataKeyValuePairs(requestId);
        const handlerOutput = await this.sendRequest(requestId, dataKeyValuePairs, actionInput);
        await upsertRequestData(requestId, dataKeyValuePairs, this.makeRequestDataDeps());
        return handlerOutput;
    }

    protected abstract sendRequest(requestId: string, dataKeyValuePairs: KeyValuePair<string | undefined>[], actionInput: ActionHandlerInput)
        : Promise<ActionHandlerOutput>;

    protected makeRequestDataDeps() {
        return {
            repo: this.requestDataRepo, 
            processor: this.requestDataProcessor
        }
    }

    private getDataKeyValuePairs(requestId: string): Promise<KeyValuePair<string | undefined>[]> {
        return Promise.all(makeArray(this.dataKey).map(async (item) => {
            return {
                key: item,
                value: await getRequestDataStringValueByKey(requestId, item, this.makeRequestDataDeps()),
            }
        }))
    }
}