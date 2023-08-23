import { 
    BachelorThesisEvaluationCreateRequest,
    BachelorThesisEvaluationUpdateRequest,
    BachelorThesisEvaluationsQueryRequest
} from "../../../contracts/requests";
import { BachelorThesisEvaluationInfosQueryResponse } from "../../../contracts/responses";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { BachelorThesisEvaluationInfoDto } from "../../../shared/dtos";

export interface BachelorThesisEvaluationServiceInterface {
    getBachelorThesisEvaluations(user: AuthorizedUser, queryRequest: BachelorThesisEvaluationsQueryRequest)
        : Promise<BachelorThesisEvaluationInfosQueryResponse>;

    getBachelorThesisEvaluation(user: AuthorizedUser, id: number): Promise<BachelorThesisEvaluationInfoDto>;

    createBachelorThesisEvaluation(user: AuthorizedUser, createRequest: BachelorThesisEvaluationCreateRequest)
        : Promise<BachelorThesisEvaluationInfoDto>;

    updateBachelorThesisEvaluation(user: AuthorizedUser, id: number, updateRequest: BachelorThesisEvaluationUpdateRequest)
        : Promise<BachelorThesisEvaluationInfoDto>;
        
    deleteBachelorThesisEvaluation(user: AuthorizedUser, id: number): Promise<void>;
}