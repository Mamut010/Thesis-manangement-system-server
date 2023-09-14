import { WorkflowEngineInterface } from "../../engines";
import { ActionType } from "../../types/action-type";
import { RequestStateDto } from "../../types/dtos";
import { RequestAdvanceCommandInterface } from "../interfaces/request-advance-command";

export class RequestSupervisor2Command implements RequestAdvanceCommandInterface {
    constructor(
        private engine: WorkflowEngineInterface, 
        private actionerId: string, 
        private requestId: string) {
        
    }

    execute(): Promise<RequestStateDto | null> {
        return this.engine.advanceRequest({
            requestId: this.requestId,
            actionerId: this.actionerId,
            actionType: ActionType.RequestSupervisor2,
        })
    }
}