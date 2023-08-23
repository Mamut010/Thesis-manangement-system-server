import { 
    BachelorThesisAssessmentCreateRequest,
    BachelorThesisAssessmentUpdateRequest,
    BachelorThesisAssessmentsQueryRequest
} from "../../contracts/requests";
import { BachelorThesisAssessmentsQueryResponse } from "../../contracts/responses";
import { BachelorThesisAssessmentDto } from "../../shared/dtos";

export interface BachelorThesisAssessmentRepoInterface {
    query(queryRequest: BachelorThesisAssessmentsQueryRequest): Promise<BachelorThesisAssessmentsQueryResponse>;

    findOneById(id: number): Promise<BachelorThesisAssessmentDto | null>;

    create(createRequest: BachelorThesisAssessmentCreateRequest): Promise<BachelorThesisAssessmentDto>;

    update(id: number, updateRequest: BachelorThesisAssessmentUpdateRequest): Promise<BachelorThesisAssessmentDto | null>;

    delete(id: number): Promise<boolean>;

    queryLecturerAssets(lecturerId: string, queryRequest: BachelorThesisAssessmentsQueryRequest)
    : Promise<BachelorThesisAssessmentDto[]>;
}