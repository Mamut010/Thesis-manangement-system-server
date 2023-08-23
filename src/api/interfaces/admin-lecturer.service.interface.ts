import { 
    LecturerAssetsQueryRequest,
    LecturerInfoUpdateRequest,
    LecturerInfosQueryRequest,
    BachelorThesisAssessmentsQueryRequest,
    BachelorThesisEvaluationsQueryRequest,
    BachelorThesisRegistrationsQueryRequest,
    OralDefenseAssessmentsQueryRequest,
    OralDefenseRegistrationsQueryRequest
} from "../../contracts/requests";
import { LecturerInfosQueryResponse, LecturerDetailResponse } from "../../contracts/responses";
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