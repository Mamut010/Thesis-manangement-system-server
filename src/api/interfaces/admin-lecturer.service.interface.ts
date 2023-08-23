import { LecturerAssetsQueryRequest } from "../../contracts/requests/api/lecturer-assets-query.request";
import { LecturerInfoUpdateRequest } from "../../contracts/requests/api/lecturer-info-update.request";
import { LecturerInfosQueryRequest } from "../../contracts/requests/api/lecturer-infos-query.request";
import { BachelorThesisAssessmentsQueryRequest } from "../../contracts/requests/resources/bachelor-thesis-assessments-query.request";
import { BachelorThesisEvaluationsQueryRequest } from "../../contracts/requests/resources/bachelor-thesis-evaluations-query.request";
import { BachelorThesisRegistrationsQueryRequest } from "../../contracts/requests/resources/bachelor-thesis-registrations-query.request";
import { OralDefenseAssessmentsQueryRequest } from "../../contracts/requests/resources/oral-defense-assessments-query.request";
import { OralDefenseRegistrationsQueryRequest } from "../../contracts/requests/resources/oral-defense-registrations-query.request";
import { LecturerDetailResponse } from "../../contracts/responses/api/lecturer-detail.response";
import { LecturerInfosQueryResponse } from "../../contracts/responses/api/lecturer-infos-query.response";
import { 
    BachelorThesisAssessmentInfoDto, 
    BachelorThesisEvaluationInfoDto, 
    BachelorThesisRegistrationInfoDto,
    LecturerInfoDto, 
    OralDefenseAssessmentInfoDto, 
    OralDefenseRegistrationInfoDto
} from "../../shared/dtos";

export interface AdminLecturerServiceInterface {
    getLecturers(lecturersQuery: LecturerInfosQueryRequest): Promise<LecturerInfosQueryResponse>;

    getLecturerInfo(lecturerId: string): Promise<LecturerInfoDto>;

    getLecturerDetail(lecturerId: string, lecturerAssetsQueryRequest: LecturerAssetsQueryRequest)
        : Promise<LecturerDetailResponse>;

    getLecturerBachelorThesisRegistrations(lecturerId: string, btrQueryRequest: BachelorThesisRegistrationsQueryRequest)
        : Promise<BachelorThesisRegistrationInfoDto[]>;

    getLecturerBachelorThesisAssessments(lecturerId: string, btaQueryRequest: BachelorThesisAssessmentsQueryRequest)
        : Promise<BachelorThesisAssessmentInfoDto[]>;

    getLecturerBachelorThesisEvaluations(lecturerId: string, bteQueryRequest: BachelorThesisEvaluationsQueryRequest)
        : Promise<BachelorThesisEvaluationInfoDto[]>

    getLecturerOralDefenseRegistrations(lecturerId: string, odrQueryRequest: OralDefenseRegistrationsQueryRequest)
        : Promise<OralDefenseRegistrationInfoDto[]>;

    getLecturerOralDefenseAssessments(lecturerId: string, odaQueryRequest: OralDefenseAssessmentsQueryRequest)
        : Promise<OralDefenseAssessmentInfoDto[]>;

    updateLecturerInfo(lecturerId: string, updateRequest: LecturerInfoUpdateRequest): Promise<LecturerInfoDto>;
}