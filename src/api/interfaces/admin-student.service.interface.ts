import { StudentsQueryRequest } from "../../contracts/requests/students-query.request";
import { StudentDetailResponse } from "../../contracts/responses/student-info.response";
import { StudentsQueryResponse } from "../../contracts/responses/students-query.response";
import { 
    BachelorThesisAssessmentDto, 
    BachelorThesisRegistrationDto,
    OralDefenseAssessmentDto, 
    OralDefenseRegistrationDto, 
    StudentInfoDto
} from "../../shared/dtos";

export interface AdminStudentServiceInterface {
    getStudents(studentsQuery: StudentsQueryRequest): Promise<StudentsQueryResponse>;
    getStudentDetail(studentId: number): Promise<StudentDetailResponse>;
    getStudentInfo(studentId: number): Promise<StudentInfoDto>
    getStudentBachelorThesisRegistration(studentId: number): Promise<BachelorThesisRegistrationDto>;
    getStudentOralDefenseRegistration(studentId: number): Promise<OralDefenseRegistrationDto>;
    getStudentBachelorThesisAssessment(studentId: number): Promise<BachelorThesisAssessmentDto>;
    getStudentOralDefenseAssessment(studentId: number): Promise<OralDefenseAssessmentDto>;
}