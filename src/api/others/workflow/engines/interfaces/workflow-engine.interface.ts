import { RequestInfo } from "../../types/infos";
import { RequestAdvanceOptions, RequestCreateOptions } from "../../types/options";

export interface WorkflowEngineInterface {
    createRequest(createOptions: RequestCreateOptions): Promise<RequestInfo | null>;
    advanceRequest(advanceOptions: RequestAdvanceOptions): Promise<RequestInfo | null>;
}