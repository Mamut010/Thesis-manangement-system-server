import { ThesisCreateRequest } from "../../contracts/requests/resources/thesis-create.request";
import { ThesesQueryRequest } from "../../contracts/requests/resources/theses-query.request";
import { ThesisUpdateRequest } from "../../contracts/requests/resources/thesis-update.request";
import { ThesesQueryResponse } from "../../contracts/responses/resources/theses-query.response";
import { ThesisDto } from "../../shared/dtos";

export interface ThesisServiceInterface {
    getTheses(thesesQuery: ThesesQueryRequest): Promise<ThesesQueryResponse>;
    getThesis(thesisId: number): Promise<ThesisDto>;
    createThesis(createRequest: ThesisCreateRequest): Promise<ThesisDto>;
    updateThesis(thesisId: number, updateRequest: ThesisUpdateRequest): Promise<ThesisDto>;
    deleteThesis(thesisId: number): Promise<void>;
}