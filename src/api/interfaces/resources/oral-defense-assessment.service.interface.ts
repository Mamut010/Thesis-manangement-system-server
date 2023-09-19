import {
    OralDefenseAssessmentInfoUpdateRequest,
    OralDefenseAssessmentInfosQueryRequest
} from "../../../contracts/requests";
import { OralDefenseAssessmentInfosQueryResponse } from "../../../contracts/responses";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { OralDefenseAssessmentInfoDto } from "../../../shared/dtos";

export interface OralDefenseAssessmentServiceInterface {
    getOralDefenseAssessments(user: AuthorizedUser, queryRequest: OralDefenseAssessmentInfosQueryRequest)
        : Promise<OralDefenseAssessmentInfosQueryResponse>;

    getOralDefenseAssessment(user: AuthorizedUser, id: number): Promise<OralDefenseAssessmentInfoDto>;

    updateOralDefenseAssessment(user: AuthorizedUser, id: number, updateRequest: OralDefenseAssessmentInfoUpdateRequest)
        : Promise<OralDefenseAssessmentInfoDto>;
        
    deleteOralDefenseAssessment(user: AuthorizedUser, id: number): Promise<void>;
}