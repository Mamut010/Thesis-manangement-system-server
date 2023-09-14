import { ActionHandlerInput, ActionHandlerOutput } from "../types";
import { BaseActionHandler } from "./base-action-handler";
import { RequestDataRepoInterface } from "../../../../../dal/interfaces";
import { WorkflowRequestDataProcessorInterface } from "../../request-data-processor";
import { upsertRequestData } from "../../utils/request-data-helpers";
import { KeyValuePair } from "../../types/utility-types";
import { makeArray } from "../../../../../utils/array-helpers";

export abstract class BaseInviteActionHandler extends BaseActionHandler {
    constructor(
        protected requestDataRepo: RequestDataRepoInterface,
        protected requestDataProcessor: WorkflowRequestDataProcessorInterface,
        protected dataKey: string | string[]) {
        super();
    }

    async handle(requestId: string, actionInput: ActionHandlerInput): Promise<ActionHandlerOutput> {
        const dataKeyValuePairs = this.getDataKeyValuePairs(actionInput);
        const handlerOutput = await this.sendInvitation(requestId, dataKeyValuePairs, actionInput);
        await upsertRequestData(requestId, dataKeyValuePairs, this.makeRequestDataDeps());
        return handlerOutput;
    }

    protected abstract sendInvitation(requestId: string, dataKeyValuePairs: KeyValuePair<string>[], actionInput: ActionHandlerInput)
        : Promise<ActionHandlerOutput>;

    protected makeRequestDataDeps() {
        return {
            repo: this.requestDataRepo, 
            processor: this.requestDataProcessor
        }
    }

    private getDataKeyValuePairs(actionInput: ActionHandlerInput): KeyValuePair<string>[] {
        return makeArray(this.dataKey).map(item => ({
            key: item,
            value: this.getInputDataStringValue(actionInput, item),
        }));
    }
}