import { 
    OralDefenseAssessmentCreateRequest,
    OralDefenseAssessmentUpdateRequest,
    OralDefenseAssessmentsQueryRequest
} from "../../../contracts/requests";
import { OralDefenseAssessmentInfosQueryResponse } from "../../../contracts/responses";
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