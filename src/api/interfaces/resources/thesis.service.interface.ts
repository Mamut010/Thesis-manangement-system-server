import { ThesisInfosQueryRequest, ThesisInfoUpdateRequest, ThesisInfoCreateRequest } from "../../../contracts/requests";
import { ThesisInfosQueryResponse } from "../../../contracts/responses";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { ThesisInfoDto } from "../../../shared/dtos";

export interface ThesisServiceInterface {
    getTheses(queryRequest: ThesisInfosQueryRequest): Promise<ThesisInfosQueryResponse>;
    getThesis(id: number): Promise<ThesisInfoDto>;
    createThesis(user: AuthorizedUser, createRequest: ThesisInfoCreateRequest): Promise<ThesisInfoDto>;
    updateThesis(user: AuthorizedUser, id: number, updateRequest: ThesisInfoUpdateRequest): Promise<ThesisInfoDto>;
    deleteThesis(user: AuthorizedUser, id: number): Promise<void>;
}