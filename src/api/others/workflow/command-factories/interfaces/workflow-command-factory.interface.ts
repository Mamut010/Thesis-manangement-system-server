import { RequestAdvanceCommandInput, RequestAdvanceCommandInterface } from "../../commands";
import { WorkflowEngineInterface } from "../../engines";
import { ActionType } from "../../types/action-type";

export interface WorkflowCommandFactoryInterface {
    createCommand(engine: WorkflowEngineInterface, actionType: ActionType, commandInput: RequestAdvanceCommandInput)
        : RequestAdvanceCommandInterface | undefined;
}