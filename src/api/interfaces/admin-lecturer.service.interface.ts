import { LecturerAssetsQueryRequest } from "../../contracts/requests/api/lecturer-assets-query.request";
import { LecturerUpdateRequest } from "../../contracts/requests/api/lecturer-update.request";
import { LecturersQueryRequest } from "../../contracts/requests/api/lecturers-query.request";
import { BachelorThesisAssessmentsQueryRequest } from "../../contracts/requests/resources/bachelor-thesis-assessments-query.request";
import { BachelorThesisEvaluationsQueryRequest } from "../../contracts/requests/resources/bachelor-thesis-evaluations-query.request";
import { BachelorThesisRegistrationsQueryRequest } from "../../contracts/requests/resources/bachelor-thesis-registrations-query.request";
import { OralDefenseAssessmentsQueryRequest } from "../../contracts/requests/resources/oral-defense-assessments-query.request";
import { OralDefenseRegistrationsQueryRequest } from "../../contracts/requests/resources/oral-defense-registrations-query.request";
import { LecturerDetailResponse } from "../../contracts/responses/api/lecturer-info.response";
import { LecturersQueryResponse } from "../../contracts/responses/api/lecturers-query.response";
import { 
    BachelorThesisAssessmentDto, 
    BachelorThesisEvaluationDto, 
    BachelorThesisRegistrationDto, 
    LecturerInfoDto, 
    OralDefenseAssessmentDto, 
    OralDefenseRegistrationDto
} from "../../shared/dtos";

export interface AdminLecturerServiceInterface {
    getLecturers(lecturersQuery: LecturersQueryRequest): Promise<LecturersQueryResponse>;

    getLecturerInfo(lecturerId: string): Promise<LecturerInfoDto>;

    getLecturerDetail(lecturerId: string, lecturerAssetsQueryRequest: LecturerAssetsQueryRequest)
        : Promise<LecturerDetailResponse>;

    getLecturerBachelorThesisRegistrations(lecturerId: string, btrQueryRequest: BachelorThesisRegistrationsQueryRequest)
        : Promise<BachelorThesisRegistrationDto[]>;

    getLecturerBachelorThesisAssessments(lecturerId: string, btaQueryRequest: BachelorThesisAssessmentsQueryRequest)
        : Promise<BachelorThesisAssessmentDto[]>;

    getLecturerBachelorThesisEvaluations(lecturerId: string, bteQueryRequest: BachelorThesisEvaluationsQueryRequest)
        : Promise<BachelorThesisEvaluationDto[]>

    getLecturerOralDefenseRegistrations(lecturerId: string, odrQueryRequest: OralDefenseRegistrationsQueryRequest)
        : Promise<OralDefenseRegistrationDto[]>;

    getLecturerOralDefenseAssessments(lecturerId: string, odaQueryRequest: OralDefenseAssessmentsQueryRequest)
        : Promise<OralDefenseAssessmentDto[]>;

    updateLecturerInfo(lecturerId: string, updateRequest: LecturerUpdateRequest): Promise<LecturerInfoDto>;
}