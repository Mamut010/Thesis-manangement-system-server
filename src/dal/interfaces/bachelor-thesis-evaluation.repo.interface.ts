import { 
    BachelorThesisEvaluationCreateRequest,
    BachelorThesisEvaluationUpdateRequest,
    BachelorThesisEvaluationsQueryRequest
} from "../../contracts/requests";
import { BachelorThesisEvaluationsQueryResponse } from "../../contracts/responses";
import { BachelorThesisEvaluationDto } from "../../shared/dtos";

export interface BachelorThesisEvaluationRepoInterface {
    query(queryRequest: BachelorThesisEvaluationsQueryRequest): Promise<BachelorThesisEvaluationsQueryResponse>;

    findOneById(id: number): Promise<BachelorThesisEvaluationDto | null>;

    create(createRequest: BachelorThesisEvaluationCreateRequest): Promise<BachelorThesisEvaluationDto>;

    update(id: number, updateRequest: BachelorThesisEvaluationUpdateRequest): Promise<BachelorThesisEvaluationDto | null>;

    delete(id: number): Promise<boolean>;
}