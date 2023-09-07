import { RequestStateDto } from "../../types/dtos";

export interface RequestAdvanceCommandInterface {
    execute(): Promise<RequestStateDto | null>;
}