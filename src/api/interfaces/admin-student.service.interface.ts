import { StudentUpdateRequest } from "../../contracts/requests/api/student-update.request";
import { StudentsQueryRequest } from "../../contracts/requests/api/students-query.request";
import { StudentDetailResponse } from "../../contracts/responses/api/student-info.response";
import { StudentsQueryResponse } from "../../contracts/responses/api/students-query.response";
import { 
    BachelorThesisAssessmentDto, 
    BachelorThesisEvaluationDto, 
    BachelorThesisRegistrationDto,
    OralDefenseAssessmentDto, 
    OralDefenseRegistrationDto, 
    StudentInfoDto
} from "../../shared/dtos";

export interface AdminStudentServiceInterface {
    getStudents(studentsQuery: StudentsQueryRequest): Promise<StudentsQueryResponse>;
    getStudentDetail(studentId: string): Promise<StudentDetailResponse>;
    getStudentInfo(studentId: string): Promise<StudentInfoDto>
    getStudentBachelorThesisRegistration(studentId: string): Promise<BachelorThesisRegistrationDto>;
    getStudentBachelorThesisAssessment(studentId: string): Promise<BachelorThesisAssessmentDto>;
    getStudentBachelorThesisEvaluation(studentId: string): Promise<BachelorThesisEvaluationDto>;
    getStudentOralDefenseRegistration(studentId: string): Promise<OralDefenseRegistrationDto>;
    getStudentOralDefenseAssessment(studentId: string): Promise<OralDefenseAssessmentDto>;
    updateStudent(studentId: string, updateRequest: StudentUpdateRequest): Promise<StudentInfoDto>;
}