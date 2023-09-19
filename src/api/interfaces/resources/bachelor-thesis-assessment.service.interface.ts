import {
    BachelorThesisAssessmentInfoUpdateRequest,
    BachelorThesisAssessmentInfosQueryRequest
} from "../../../contracts/requests";
import { BachelorThesisAssessmentInfosQueryResponse } from "../../../contracts/responses";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { BachelorThesisAssessmentInfoDto } from "../../../shared/dtos";

export interface BachelorThesisAssessmentServiceInterface {
    getBachelorThesisAssessments(user: AuthorizedUser, queryRequest: BachelorThesisAssessmentInfosQueryRequest)
        : Promise<BachelorThesisAssessmentInfosQueryResponse>;

    getBachelorThesisAssessment(user: AuthorizedUser, id: number): Promise<BachelorThesisAssessmentInfoDto>;

    updateBachelorThesisAssessment(user: AuthorizedUser, id: number, updateRequest: BachelorThesisAssessmentInfoUpdateRequest)
        : Promise<BachelorThesisAssessmentInfoDto>;
        
    deleteBachelorThesisAssessment(user: AuthorizedUser, id: number): Promise<void>;
}