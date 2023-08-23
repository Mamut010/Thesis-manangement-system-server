import { 
    BachelorThesisAssessmentCreateRequest,
    BachelorThesisAssessmentUpdateRequest,
    BachelorThesisAssessmentsQueryRequest
} from "../../../contracts/requests";
import { BachelorThesisAssessmentInfosQueryResponse } from "../../../contracts/responses";
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