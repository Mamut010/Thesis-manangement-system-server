import { LecturerUpdateRequest } from "../../contracts/requests/lecturer-update.request";
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
    getLecturerDetail(lecturerId: string): Promise<LecturerDetailResponse>;
    getLecturerInfo(lecturerId: string): Promise<LecturerInfoDto>
    getLecturerBachelorThesisRegistrations(lecturerId: string): Promise<BachelorThesisRegistrationDto[]>;
    getLecturerOralDefenseRegistrations(lecturerId: string): Promise<OralDefenseRegistrationDto[]>;
    getLecturerBachelorThesisAssessments(lecturerId: string): Promise<BachelorThesisAssessmentDto[]>;
    getLecturerOralDefenseAssessments(lecturerId: string): Promise<OralDefenseAssessmentDto[]>;
    updateLecturer(lecturerId: string, updateRequest: LecturerUpdateRequest): Promise<LecturerInfoDto>;
}