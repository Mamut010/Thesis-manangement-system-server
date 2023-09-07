import { STORED_REQUEST_DATA_KEYS } from "../../constants/request-data-keys";
import { WorkflowEngineInterface } from "../../engines";
import { ActionType } from "../../types/action-type";
import { RequestStateDto } from "../../types/dtos";
import { RequestAdvanceCommandInterface } from "../interfaces/request-advance-command";

export class RequestSupervisor1Command implements RequestAdvanceCommandInterface {
    constructor(
        private engine: WorkflowEngineInterface, 
        private actionerId: string, 
        private requestId: string,
        private supervisor1Id: string) {
        
    }

    execute(): Promise<RequestStateDto | null> {
        return this.engine.advanceRequest({
            requestId: this.requestId,
            actionerId: this.actionerId,
            actionType: ActionType.RequestSupervisor1,
            data: {
                [STORED_REQUEST_DATA_KEYS.Supervisor1]: this.supervisor1Id
            }
        })
    }
}