import { 
    LecturerAssetsQueryRequest,
    LecturerInfoUpdateRequest,
    BachelorThesisAssessmentsQueryRequest,
    BachelorThesisEvaluationsQueryRequest,
    BachelorThesisRegistrationsQueryRequest,
    OralDefenseAssessmentsQueryRequest,
    OralDefenseRegistrationsQueryRequest,
    LecturerInfosQueryRequest
} from "../../contracts/requests";
import { LecturerDetailResponse, LecturerInfosQueryResponse } from "../../contracts/responses";
import { 
    BachelorThesisAssessmentInfoDto, 
    BachelorThesisEvaluationInfoDto, 
    BachelorThesisRegistrationInfoDto,
    LecturerInfoDto, 
    OralDefenseAssessmentInfoDto, 
    OralDefenseRegistrationInfoDto
} from "../../shared/dtos";

export interface LecturerServiceInterface {
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