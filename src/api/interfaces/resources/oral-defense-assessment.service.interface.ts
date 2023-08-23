import { OralDefenseAssessmentCreateRequest } from "../../../contracts/requests/resources/oral-defense-assessment-create.request";
import { OralDefenseAssessmentUpdateRequest } from "../../../contracts/requests/resources/oral-defense-assessment-update.request";
import { OralDefenseAssessmentsQueryRequest } from "../../../contracts/requests/resources/oral-defense-assessments-query.request";
import { OralDefenseAssessmentInfosQueryResponse } from "../../../contracts/responses/api/oral-defense-assessment-infos-query.response";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { OralDefenseAssessmentInfoDto } from "../../../shared/dtos";

export interface OralDefenseAssessmentServiceInterface {
    getOralDefenseAssessments(user: AuthorizedUser, queryRequest: OralDefenseAssessmentsQueryRequest)
        : Promise<OralDefenseAssessmentInfosQueryResponse>;

    getOralDefenseAssessment(user: AuthorizedUser, id: number): Promise<OralDefenseAssessmentInfoDto>;

    createOralDefenseAssessment(user: AuthorizedUser, createRequest: OralDefenseAssessmentCreateRequest)
        : Promise<OralDefenseAssessmentInfoDto>;

    updateOralDefenseAssessment(user: AuthorizedUser, id: number, updateRequest: OralDefenseAssessmentUpdateRequest)
        : Promise<OralDefenseAssessmentInfoDto>;
        
    deleteOralDefenseAssessment(user: AuthorizedUser, id: number): Promise<void>;
}