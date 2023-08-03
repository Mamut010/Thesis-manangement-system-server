import { LecturersQueryRequest } from "../../contracts/requests/lecturers-query.request";
import { LecturerDetailResponse } from "../../contracts/responses/lecturer-info.response";
import { LecturersQueryResponse } from "../../contracts/responses/lecturers-query.response";
import { 
    BachelorThesisAssessmentDto, 
    BachelorThesisRegistrationDto, 
    LecturerInfoDto, 
    OralDefenseAssessmentDto, 
    OralDefenseRegistrationDto
} from "../../shared/dtos";

export interface AdminLecturerServiceInterface {
    getLecturers(lecturersQuery: LecturersQueryRequest): Promise<LecturersQueryResponse>;
    getLecturerDetail(lecturerId: number): Promise<LecturerDetailResponse>;
    getLecturerInfo(lecturerId: number): Promise<LecturerInfoDto>
    getLecturerBachelorThesisRegistrations(lecturerId: number): Promise<BachelorThesisRegistrationDto[]>;
    getLecturerOralDefenseRegistrations(lecturerId: number): Promise<OralDefenseRegistrationDto[]>;
    getLecturerBachelorThesisAssessments(lecturerId: number): Promise<BachelorThesisAssessmentDto[]>;
    getLecturerOralDefenseAssessments(lecturerId: number): Promise<OralDefenseAssessmentDto[]>;
}