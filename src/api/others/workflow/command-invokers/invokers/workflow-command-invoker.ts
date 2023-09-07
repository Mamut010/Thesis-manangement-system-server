import { injectable } from "inversify";
import { RequestAdvanceCommandInterface } from "../../commands";
import { RequestStateDto } from "../../types/dtos";
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

    async invoke(): Promise<RequestStateDto | null | undefined> {
        return this.command ? this.command.execute() : undefined;
    }
}