import { BachelorThesisAssessmentCreateRequest } from "../../contracts/requests/resources/bachelor-thesis-assessment-create.request";
import { BachelorThesisAssessmentUpdateRequest } from "../../contracts/requests/resources/bachelor-thesis-assessment-update.request";
import { BachelorThesisAssessmentsQueryRequest } from "../../contracts/requests/resources/bachelor-thesis-assessments-query.request";
import { BachelorThesisAssessmentsQueryResponse } from "../../contracts/responses/resources/bachelor-thesis-assessments-query.response";
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