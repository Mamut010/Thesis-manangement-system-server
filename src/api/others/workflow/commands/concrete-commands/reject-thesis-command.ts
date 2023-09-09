import { WorkflowEngineInterface } from "../../engines";
import { ActionType } from "../../types/action-type";
import { SimpleRequestAdvanceCommand } from "./simple-request-advance-command";

export class RejectThesisCommand extends SimpleRequestAdvanceCommand {
    constructor(engine: WorkflowEngineInterface, actionerId: string, requestId: string) {
        super(ActionType.RejectThesis, engine, actionerId, requestId);
    }
}