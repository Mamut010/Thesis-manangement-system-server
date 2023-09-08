import { RequestStateDto } from "../../types/dtos";
import { RequestAdvanceOptions, RequestCreateOptions } from "../../types/options";

export interface WorkflowEngineInterface {
    getRequestStates(actionerId: string, requestIds: string[]): Promise<RequestStateDto[]>;

    getRequestState(actionerId: string, requestId: string): Promise<RequestStateDto | null>;

    createRequest(createOptions: RequestCreateOptions): Promise<RequestStateDto | null>;

    advanceRequest(advanceOptions: RequestAdvanceOptions): Promise<RequestStateDto | null>;
}