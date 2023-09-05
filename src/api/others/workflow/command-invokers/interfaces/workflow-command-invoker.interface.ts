import { RequestAdvanceCommandInterface } from "../../commands";
import { RequestInfo } from "../../types/infos";

export interface WorkflowCommandInvokerInterface {
    setCommand(command: RequestAdvanceCommandInterface): void;
    getCommand(): RequestAdvanceCommandInterface | undefined;
    runCommand(): Promise<RequestInfo | null>;
}