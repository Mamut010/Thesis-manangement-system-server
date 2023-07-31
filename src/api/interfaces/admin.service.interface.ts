import { LecturerDetailResponse } from "../../contracts/responses/lecturer-info.response";
import { StudentDetailResponse } from "../../contracts/responses/student-info.response";
import { 
    AdminInfoDto,
    BachelorThesisAssessmentDto, 
    BachelorThesisRegistrationDto, 
    LecturerInfoDto, 
    OralDefenseAssessmentDto, 
    OralDefenseRegistrationDto, 
    StudentInfoDto,
    ThesisInfoDto
} from "../../shared/dtos";

export interface AdminServiceInterface {
    getAdminInfo(adminId: number): Promise<AdminInfoDto>;
    getStudentDetail(studentId: number): Promise<StudentDetailResponse>;
    getStudentInfo(studentId: number): Promise<StudentInfoDto>
    getStudentBachelorThesisRegistration(studentId: number): Promise<BachelorThesisRegistrationDto>;
    getStudentOralDefenseRegistration(studentId: number): Promise<OralDefenseRegistrationDto>;
    getStudentBachelorThesisAssessment(studentId: number): Promise<BachelorThesisAssessmentDto>;
    getStudentOralDefenseAssessment(studentId: number): Promise<OralDefenseAssessmentDto>;
    getLecturerDetail(lecturerId: number): Promise<LecturerDetailResponse>;
    getLecturerInfo(lecturerId: number): Promise<LecturerInfoDto>
    getLecturerBachelorThesisRegistrations(lecturerId: number): Promise<BachelorThesisRegistrationDto[]>;
    getLecturerOralDefenseRegistrations(lecturerId: number): Promise<OralDefenseRegistrationDto[]>;
    getLecturerBachelorThesisAssessments(lecturerId: number): Promise<BachelorThesisAssessmentDto[]>;
    getLecturerOralDefenseAssessments(lecturerId: number): Promise<OralDefenseAssessmentDto[]>;
    getThesisInfo(thesisId: number): Promise<ThesisInfoDto>;
}