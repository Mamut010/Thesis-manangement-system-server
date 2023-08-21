import { BachelorThesisEvaluationCreateRequest } from "../../contracts/requests/resources/bachelor-thesis-evaluation-create.request";
import { BachelorThesisEvaluationUpdateRequest } from "../../contracts/requests/resources/bachelor-thesis-evaluation-update.request";
import { BachelorThesisEvaluationsQueryRequest } from "../../contracts/requests/resources/bachelor-thesis-evaluations-query.request";
import { BachelorThesisEvaluationsQueryResponse } from "../../contracts/responses/resources/bachelor-thesis-evaluations-query.response";
import { BachelorThesisEvaluationDto } from "../../shared/dtos";

export interface BachelorThesisEvaluationRepoInterface {
    query(queryRequest: BachelorThesisEvaluationsQueryRequest): Promise<BachelorThesisEvaluationsQueryResponse>;

    findOneById(id: number): Promise<BachelorThesisEvaluationDto | null>;

    create(createRequest: BachelorThesisEvaluationCreateRequest): Promise<BachelorThesisEvaluationDto>;

    update(id: number, updateRequest: BachelorThesisEvaluationUpdateRequest): Promise<BachelorThesisEvaluationDto | null>;

    delete(id: number): Promise<void>;
}