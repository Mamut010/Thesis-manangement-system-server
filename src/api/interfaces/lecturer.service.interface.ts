import {
    LecturerInfoUpdateRequest,
    LecturerInfosQueryRequest,
    BachelorThesisAssessmentInfosQueryRequest,
    BachelorThesisEvaluationInfosQueryRequest,
    OralDefenseRegistrationInfosQueryRequest,
    OralDefenseAssessmentInfosQueryRequest,
    BachelorThesisRegistrationInfosQueryRequest,
    SimpleQueryRequest
} from "../../contracts/requests";
import { 
    BachelorThesisAssessmentInfosQueryResponse, 
    BachelorThesisEvaluationInfosQueryResponse, 
    BachelorThesisRegistrationInfosQueryResponse, 
    LecturerDetailResponse, 
    LecturerInfosQueryResponse, 
    OralDefenseAssessmentInfosQueryResponse, 
    OralDefenseRegistrationInfosQueryResponse 
} from "../../contracts/responses";
import { LecturerInfoDto } from "../../shared/dtos";

export interface LecturerServiceInterface {
    getLecturers(lecturersQuery: LecturerInfosQueryRequest): Promise<LecturerInfosQueryResponse>;

    getLecturerInfo(lecturerId: string): Promise<LecturerInfoDto>;

    getLecturerDetail(lecturerId: string, queryRequest?: SimpleQueryRequest)
        : Promise<LecturerDetailResponse>;

    getLecturerBachelorThesisRegistrations(lecturerId: string, btrQueryRequest?: BachelorThesisRegistrationInfosQueryRequest)
        : Promise<BachelorThesisRegistrationInfosQueryResponse>;

    getLecturerBachelorThesisAssessments(lecturerId: string, btaQueryRequest?: BachelorThesisAssessmentInfosQueryRequest)
        : Promise<BachelorThesisAssessmentInfosQueryResponse>;

    getLecturerBachelorThesisEvaluations(lecturerId: string, bteQueryRequest?: BachelorThesisEvaluationInfosQueryRequest)
        : Promise<BachelorThesisEvaluationInfosQueryResponse>

    getLecturerOralDefenseRegistrations(lecturerId: string, odrQueryRequest?: OralDefenseRegistrationInfosQueryRequest)
        : Promise<OralDefenseRegistrationInfosQueryResponse>;

    getLecturerOralDefenseAssessments(lecturerId: string, odaQueryRequest?: OralDefenseAssessmentInfosQueryRequest)
        : Promise<OralDefenseAssessmentInfosQueryResponse>;

    updateLecturerInfo(lecturerId: string, updateRequest: LecturerInfoUpdateRequest): Promise<LecturerInfoDto>;
}