import { WorkflowEngineInterface } from "../../engines";
import { ActionType } from "../../types/action-type";
import { SimpleRequestAdvanceCommand } from "./simple-request-advance-command";

export class ConfirmBTRCommand extends SimpleRequestAdvanceCommand {
    constructor(engine: WorkflowEngineInterface, actionerId: string, requestId: string) {
        super(ActionType.ConfirmBachelorThesisRegistration, engine, actionerId, requestId);
    }
}