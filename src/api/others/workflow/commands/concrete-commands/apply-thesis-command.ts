import { STORED_REQUEST_DATA_KEYS } from "../../constants/request-data-keys";
import { WorkflowEngineInterface } from "../../engines";
import { ActionType } from "../../types/action-type";
import { RequestInfo } from "../../types/infos";
import { RequestAdvanceCommandInterface } from "../interfaces/request-advance-command";

export class ApplyThesisCommand implements RequestAdvanceCommandInterface {
    constructor(
        private engine: WorkflowEngineInterface, 
        private actionerId: string, 
        private requestId: string,
        private thesisId: string) {
        
    }

    execute(): Promise<RequestInfo | null> {
        return this.engine.advanceRequest({
            requestId: this.requestId,
            actionerId: this.actionerId,
            actionType: ActionType.ApplyThesis,
            data: {
                [STORED_REQUEST_DATA_KEYS.Thesis]: this.thesisId
            }
        })
    }
}