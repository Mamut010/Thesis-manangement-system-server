import { StudentDetailResponse } from "../../contracts/responses/student-info.response";
import { 
    BachelorThesisAssessmentDto, 
    BachelorThesisRegistrationDto,
    OralDefenseAssessmentDto, 
    OralDefenseRegistrationDto, 
    StudentInfoDto
} from "../../shared/dtos";

export interface AdminStudentServiceInterface {
    getStudentDetail(studentId: number): Promise<StudentDetailResponse>;
    getStudentInfo(studentId: number): Promise<StudentInfoDto>
    getStudentBachelorThesisRegistration(studentId: number): Promise<BachelorThesisRegistrationDto>;
    getStudentOralDefenseRegistration(studentId: number): Promise<OralDefenseRegistrationDto>;
    getStudentBachelorThesisAssessment(studentId: number): Promise<BachelorThesisAssessmentDto>;
    getStudentOralDefenseAssessment(studentId: number): Promise<OralDefenseAssessmentDto>;
}