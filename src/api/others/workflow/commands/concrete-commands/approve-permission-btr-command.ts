import { WorkflowEngineInterface } from "../../engines";
import { ActionType } from "../../types/action-type";
import { SimpleRequestAdvanceCommand } from "./simple-request-advance-command";

export class ApprovePermissionBTRCommand extends SimpleRequestAdvanceCommand {
    constructor(engine: WorkflowEngineInterface, actionerId: string, requestId: string) {
        super(ActionType.ApprovePermissionBachelorThesisRegistration, engine, actionerId, requestId);
    }
}