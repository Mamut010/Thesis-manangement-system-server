export interface WorkflowRequestDataProcessorInterface {
    makeStoredValue(value: unknown): string;
    retrieveOriginalValue<T = unknown>(storedValue: string): T;
}