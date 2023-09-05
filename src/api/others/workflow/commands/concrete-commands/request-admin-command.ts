import { STORED_REQUEST_DATA_KEYS } from "../../constants/request-data-keys";
import { WorkflowEngineInterface } from "../../engines";
import { ActionType } from "../../types/action-type";
import { RequestInfo } from "../../types/infos";
import { RequestAdvanceCommandInterface } from "../interfaces/request-advance-command";

export class RequestAdminCommand implements RequestAdvanceCommandInterface {
    constructor(
        private engine: WorkflowEngineInterface, 
        private actionerId: string, 
        private requestId: string,
        private adminGroupId: string) {
        
    }

    execute(): Promise<RequestInfo | null> {
        return this.engine.advanceRequest({
            requestId: this.requestId,
            actionerId: this.actionerId,
            actionType: ActionType.RequestAdmin,
            data: {
                [STORED_REQUEST_DATA_KEYS.AdminGroup]: this.adminGroupId
            }
        })
    }
}