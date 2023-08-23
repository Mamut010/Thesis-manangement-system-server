import { ThesisCreateRequest, ThesesQueryRequest, ThesisUpdateRequest } from "../../../contracts/requests";
import { ThesesQueryResponse } from "../../../contracts/responses";
import { ThesisDto } from "../../../shared/dtos";

export interface ThesisServiceInterface {
    getTheses(queryRequest: ThesesQueryRequest): Promise<ThesesQueryResponse>;
    getThesis(id: number): Promise<ThesisDto>;
    createThesis(createRequest: ThesisCreateRequest): Promise<ThesisDto>;
    updateThesis(id: number, updateRequest: ThesisUpdateRequest): Promise<ThesisDto>;
    deleteThesis(id: number): Promise<void>;
}