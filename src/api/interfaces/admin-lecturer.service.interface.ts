import { LecturerDetailResponse } from "../../contracts/responses/lecturer-info.response";
import { 
    BachelorThesisAssessmentDto, 
    BachelorThesisRegistrationDto, 
    LecturerInfoDto, 
    OralDefenseAssessmentDto, 
    OralDefenseRegistrationDto
} from "../../shared/dtos";

export interface AdminLecturerServiceInterface {
    getLecturerDetail(lecturerId: number): Promise<LecturerDetailResponse>;
    getLecturerInfo(lecturerId: number): Promise<LecturerInfoDto>
    getLecturerBachelorThesisRegistrations(lecturerId: number): Promise<BachelorThesisRegistrationDto[]>;
    getLecturerOralDefenseRegistrations(lecturerId: number): Promise<OralDefenseRegistrationDto[]>;
    getLecturerBachelorThesisAssessments(lecturerId: number): Promise<BachelorThesisAssessmentDto[]>;
    getLecturerOralDefenseAssessments(lecturerId: number): Promise<OralDefenseAssessmentDto[]>;
}