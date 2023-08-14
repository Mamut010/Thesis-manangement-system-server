import { BachelorThesisEvaluationCreateRequest } from "../../../contracts/requests/resources/bachelor-thesis-evaluation-create.request";
import { BachelorThesisEvaluationUpdateRequest } from "../../../contracts/requests/resources/bachelor-thesis-evaluation-update.request";
import { BachelorThesisEvaluationsQueryRequest } from "../../../contracts/requests/resources/bachelor-thesis-evaluations-query.request";
import { BachelorThesisEvaluationsQueryResponse } from "../../../contracts/responses/resources/bachelor-thesis-evaluations-query.response";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { BachelorThesisEvaluationDto } from "../../../shared/dtos";

export interface BachelorThesisEvaluationServiceInterface {
    getBachelorThesisEvaluations(user: AuthorizedUser, queryRequest: BachelorThesisEvaluationsQueryRequest)
        : Promise<BachelorThesisEvaluationsQueryResponse>;

    getBachelorThesisEvaluation(user: AuthorizedUser, id: number): Promise<BachelorThesisEvaluationDto>;

    createBachelorThesisEvaluation(user: AuthorizedUser, createRequest: BachelorThesisEvaluationCreateRequest)
        : Promise<BachelorThesisEvaluationDto>;

    updateBachelorThesisEvaluation(user: AuthorizedUser, id: number, updateRequest: BachelorThesisEvaluationUpdateRequest)
        : Promise<BachelorThesisEvaluationDto>;
        
    deleteBachelorThesisEvaluation(user: AuthorizedUser, id: number): Promise<void>;
}