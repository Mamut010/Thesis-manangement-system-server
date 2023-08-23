import { BachelorThesisAssessmentCreateRequest } from "../../../contracts/requests/resources/bachelor-thesis-assessment-create.request";
import { BachelorThesisAssessmentUpdateRequest } from "../../../contracts/requests/resources/bachelor-thesis-assessment-update.request";
import { BachelorThesisAssessmentsQueryRequest } from "../../../contracts/requests/resources/bachelor-thesis-assessments-query.request";
import { BachelorThesisAssessmentInfosQueryResponse } from "../../../contracts/responses/api/bachelor-thesis-assessment-infos-query.response";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { BachelorThesisAssessmentInfoDto } from "../../../shared/dtos";

export interface BachelorThesisAssessmentServiceInterface {
    getBachelorThesisAssessments(user: AuthorizedUser, queryRequest: BachelorThesisAssessmentsQueryRequest)
        : Promise<BachelorThesisAssessmentInfosQueryResponse>;

    getBachelorThesisAssessment(user: AuthorizedUser, id: number): Promise<BachelorThesisAssessmentInfoDto>;

    createBachelorThesisAssessment(user: AuthorizedUser, createRequest: BachelorThesisAssessmentCreateRequest)
        : Promise<BachelorThesisAssessmentInfoDto>;

    updateBachelorThesisAssessment(user: AuthorizedUser, id: number, updateRequest: BachelorThesisAssessmentUpdateRequest)
        : Promise<BachelorThesisAssessmentInfoDto>;
        
    deleteBachelorThesisAssessment(user: AuthorizedUser, id: number): Promise<void>;
}