import { OralDefenseAssessmentCreateRequest } from "../../contracts/requests/resources/oral-defense-assessment-create.request";
import { OralDefenseAssessmentUpdateRequest } from "../../contracts/requests/resources/oral-defense-assessment-update.request";
import { OralDefenseAssessmentsQueryRequest } from "../../contracts/requests/resources/oral-defense-assessments-query.request";
import { OralDefenseAssessmentsQueryResponse } from "../../contracts/responses/resources/oral-defense-assessments-query.response";
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