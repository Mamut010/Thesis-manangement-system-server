import { BachelorThesisEvaluationInfosQueryRequest } from "../../../contracts/requests";
import { BachelorThesisEvaluationInfosQueryResponse } from "../../../contracts/responses";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { BachelorThesisEvaluationInfoDto } from "../../../shared/dtos";

export interface BachelorThesisEvaluationServiceInterface {
    getBachelorThesisEvaluations(user: AuthorizedUser, queryRequest: BachelorThesisEvaluationInfosQueryRequest)
        : Promise<BachelorThesisEvaluationInfosQueryResponse>;

    getBachelorThesisEvaluation(user: AuthorizedUser, id: number): Promise<BachelorThesisEvaluationInfoDto>;
        
    deleteBachelorThesisEvaluation(user: AuthorizedUser, id: number): Promise<void>;
}