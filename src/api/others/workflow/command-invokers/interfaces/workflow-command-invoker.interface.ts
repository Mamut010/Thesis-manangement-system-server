import { RequestAdvanceCommandInterface } from "../../commands";
import { RequestStateDto } from "../../types/dtos";

export interface WorkflowCommandInvokerInterface {
    setCommand(command: RequestAdvanceCommandInterface): void;
    getCommand(): RequestAdvanceCommandInterface | undefined;
    invoke(): Promise<RequestStateDto | null | undefined>;
}