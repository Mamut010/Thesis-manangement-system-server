import { BachelorThesisEvaluationCreateRequest } from "../../../contracts/requests/resources/bachelor-thesis-evaluation-create.request";
import { BachelorThesisEvaluationUpdateRequest } from "../../../contracts/requests/resources/bachelor-thesis-evaluation-update.request";
import { BachelorThesisEvaluationsQueryRequest } from "../../../contracts/requests/resources/bachelor-thesis-evaluations-query.request";
import { BachelorThesisEvaluationInfosQueryResponse } from "../../../contracts/responses/api/bachelor-thesis-evaluation-infos-query.response";
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