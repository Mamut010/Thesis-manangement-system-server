import { RequestAdvanceCommandInput } from "../types";
import { RequestAdvanceCommandInterface } from "./request-advance-command";

export interface WorkflowCommandFactoryInterface {
    createCommand(actionType: string, commandInput: RequestAdvanceCommandInput)
        : RequestAdvanceCommandInterface | undefined;
}