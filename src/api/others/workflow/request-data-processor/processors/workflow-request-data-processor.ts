import { injectable } from "inversify";
import { WorkflowRequestDataProcessorInterface } from "../interfaces/workflow-request-data-processor.interface";

@injectable()
export class WorkflowRequestDataProcessor implements WorkflowRequestDataProcessorInterface {
    public makeStoredValue(value: unknown): string {
        return JSON.stringify(value);
    }

    public retrieveOriginalValue<T = unknown>(storedValue: string): T {
        return JSON.parse(storedValue) as T;
    }
}