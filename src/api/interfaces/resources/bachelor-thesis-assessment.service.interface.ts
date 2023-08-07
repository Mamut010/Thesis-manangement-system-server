import { BachelorThesisAssessmentCreateRequest } from "../../../contracts/requests/resources/bachelor-thesis-assessment-create.request";
import { BachelorThesisAssessmentUpdateRequest } from "../../../contracts/requests/resources/bachelor-thesis-assessment-update.request";
import { BachelorThesisAssessmentsQueryRequest } from "../../../contracts/requests/resources/bachelor-thesis-assessments-query.request";
import { BachelorThesisAssessmentsQueryResponse } from "../../../contracts/responses/resources/bachelor-thesis-assessments-query.response";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { BachelorThesisAssessmentDto } from "../../../shared/dtos";

export interface BachelorThesisAssessmentServiceInterface {
    getBachelorThesisAssessments(user: AuthorizedUser, queryRequest: BachelorThesisAssessmentsQueryRequest)
        : Promise<BachelorThesisAssessmentsQueryResponse>;

    getBachelorThesisAssessment(user: AuthorizedUser, id: number): Promise<BachelorThesisAssessmentDto>;

    createBachelorThesisAssessment(user: AuthorizedUser, createRequest: BachelorThesisAssessmentCreateRequest)
        : Promise<BachelorThesisAssessmentDto>;

    updateBachelorThesisAssessment(user: AuthorizedUser, id: number, updateRequest: BachelorThesisAssessmentUpdateRequest)
        : Promise<BachelorThesisAssessmentDto>;
        
    deleteBachelorThesisAssessment(user: AuthorizedUser, id: number): Promise<void>;
}