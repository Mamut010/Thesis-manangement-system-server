import { ThesisCreateRequest } from "../../contracts/requests/thesis-create.request";
import { ThesesQueryRequest } from "../../contracts/requests/theses-query.request";
import { ThesisUpdateRequest } from "../../contracts/requests/thesis-update.request";
import { ThesesQueryResponse } from "../../contracts/responses/theses-query.response";
import { ThesisInfoDto } from "../../shared/dtos";

export interface AdminThesisServiceInterface {
    getTheses(thesesQuery: ThesesQueryRequest): Promise<ThesesQueryResponse>;
    getThesisInfo(thesisId: number): Promise<ThesisInfoDto>;
    createThesis(createRequest: ThesisCreateRequest): Promise<ThesisInfoDto>;
    updateThesis(thesisId: number, updateRequest: ThesisUpdateRequest): Promise<ThesisInfoDto>;
    deleteThesis(thesisId: number): Promise<void>;
}