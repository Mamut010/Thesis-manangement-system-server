import { WorkflowEngineInterface } from "../../engines";
import { ActionType } from "../../types/action-type";
import { RequestAdvanceCommandInput } from "../types";
import { RequestAdvanceCommandInterface } from "./request-advance-command";

export interface WorkflowCommandFactoryInterface {
    createCommand(engine: WorkflowEngineInterface, actionType: ActionType, commandInput: RequestAdvanceCommandInput)
        : RequestAdvanceCommandInterface | undefined;
}