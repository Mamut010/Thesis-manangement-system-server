import { injectable } from "inversify";
import { RequestAdvanceCommandInterface } from "../../commands";
import { RequestInfo } from "../../types/infos";
import { WorkflowCommandInvokerInterface } from "../interfaces/workflow-command-invoker.interface";

@injectable()
export class WorkflowCommandInvoker implements WorkflowCommandInvokerInterface {
    private command?: RequestAdvanceCommandInterface;

    setCommand(command: RequestAdvanceCommandInterface): void {
        this.command = command;
    }
    
    getCommand(): RequestAdvanceCommandInterface | undefined {
        return this.command;
    }

    async runCommand(): Promise<RequestInfo | null> {
        return this.command?.execute() ?? null;
    }
}