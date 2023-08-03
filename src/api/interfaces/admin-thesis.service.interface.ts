import { ThesesQueryRequest } from "../../contracts/requests/theses-query.request";
import { ThesesQueryResponse } from "../../contracts/responses/theses-query.response";
import { ThesisInfoDto } from "../../shared/dtos";

export interface AdminThesisServiceInterface {
    getTheses(thesesQuery: ThesesQueryRequest): Promise<ThesesQueryResponse>;
    getThesisInfo(thesisId: number): Promise<ThesisInfoDto>;
}