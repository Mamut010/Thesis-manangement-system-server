import { OralDefenseAssessmentCreateRequest } from "../../contracts/requests";
import { OralDefenseAssessmentUpdateRequest } from "../../contracts/requests";
import { OralDefenseAssessmentsQueryRequest } from "../../contracts/requests";
import { OralDefenseAssessmentsQueryResponse } from "../../contracts/responses";
import { OralDefenseAssessmentDto } from "../../shared/dtos";

export interface OralDefenseAssessmentRepoInterface {
    query(queryRequest: OralDefenseAssessmentsQueryRequest): Promise<OralDefenseAssessmentsQueryResponse>;

    findOneById(id: number): Promise<OralDefenseAssessmentDto | null>;

    create(createRequest: OralDefenseAssessmentCreateRequest): Promise<OralDefenseAssessmentDto>;

    update(id: number, updateRequest: OralDefenseAssessmentUpdateRequest): Promise<OralDefenseAssessmentDto | null>;

    delete(id: number): Promise<boolean>;

    queryLecturerAssets(lecturerId: string, queryRequest: OralDefenseAssessmentsQueryRequest)
        : Promise<OralDefenseAssessmentDto[]>;
}