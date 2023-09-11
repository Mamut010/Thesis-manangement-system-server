import { ThesisInfosQueryRequest, ThesisInfoUpdateRequest, ThesisInfoCreateRequest } from "../../../contracts/requests";
import { ThesisInfosQueryResponse } from "../../../contracts/responses";
import { ThesisInfoDto } from "../../../shared/dtos";

export interface ThesisServiceInterface {
    getTheses(queryRequest: ThesisInfosQueryRequest): Promise<ThesisInfosQueryResponse>;
    getThesis(id: number): Promise<ThesisInfoDto>;
    createThesis(userId: string, createRequest: ThesisInfoCreateRequest): Promise<ThesisInfoDto>;
    updateThesis(id: number, updateRequest: ThesisInfoUpdateRequest): Promise<ThesisInfoDto>;
    deleteThesis(id: number): Promise<void>;
}