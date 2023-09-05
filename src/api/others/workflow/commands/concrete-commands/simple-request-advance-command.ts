import { WorkflowEngineInterface } from "../../engines";
import { ActionType } from "../../types/action-type";
import { RequestInfo } from "../../types/infos";
import { RequestAdvanceCommandInterface } from "../interfaces/request-advance-command";

export class SimpleRequestAdvanceCommand implements RequestAdvanceCommandInterface {
    constructor(
        private actionType: ActionType,
        private engine: WorkflowEngineInterface, 
        private actionerId: string, 
        private requestId: string) {
        
    }

    execute(): Promise<RequestInfo | null> {
        return this.engine.advanceRequest({
            requestId: this.requestId,
            actionerId: this.actionerId,
            actionType: this.actionType,
        })
    }
}