import { RequestInfo } from "../../types/infos";

export interface RequestAdvanceCommandInterface {
    execute(): Promise<RequestInfo | null>;
}