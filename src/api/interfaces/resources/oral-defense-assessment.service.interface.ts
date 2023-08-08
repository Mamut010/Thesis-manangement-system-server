import { OralDefenseAssessmentCreateRequest } from "../../../contracts/requests/resources/oral-defense-assessment-create.request";
import { OralDefenseAssessmentUpdateRequest } from "../../../contracts/requests/resources/oral-defense-assessment-update.request";
import { OralDefenseAssessmentsQueryRequest } from "../../../contracts/requests/resources/oral-defense-assessments-query.request";
import { OralDefenseAssessmentsQueryResponse } from "../../../contracts/responses/resources/oral-defense-assessments-query.response";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { OralDefenseAssessmentDto } from "../../../shared/dtos";

export interface OralDefenseAssessmentServiceInterface {
    getOralDefenseAssessments(user: AuthorizedUser, queryRequest: OralDefenseAssessmentsQueryRequest)
        : Promise<OralDefenseAssessmentsQueryResponse>;

    getOralDefenseAssessment(user: AuthorizedUser, id: number): Promise<OralDefenseAssessmentDto>;

    createOralDefenseAssessment(user: AuthorizedUser, createRequest: OralDefenseAssessmentCreateRequest)
        : Promise<OralDefenseAssessmentDto>;

    updateOralDefenseAssessment(user: AuthorizedUser, id: number, updateRequest: OralDefenseAssessmentUpdateRequest)
        : Promise<OralDefenseAssessmentDto>;
        
    deleteOralDefenseAssessment(user: AuthorizedUser, id: number): Promise<void>;
}