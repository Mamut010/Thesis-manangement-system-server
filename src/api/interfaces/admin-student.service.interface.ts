import { StudentInfoUpdateRequest } from "../../contracts/requests/api/student-info-update.request";
import { StudentInfosQueryRequest } from "../../contracts/requests/api/student-infos-query.request";
import { StudentDetailResponse } from "../../contracts/responses/api/student-detail.response";
import { StudentInfosQueryResponse } from "../../contracts/responses/api/student-infos-query.response";
import { 
    BachelorThesisAssessmentDto, 
    BachelorThesisEvaluationDto, 
    BachelorThesisRegistrationDto,
    OralDefenseAssessmentDto, 
    OralDefenseRegistrationDto, 
    StudentInfoDto
} from "../../shared/dtos";

export interface AdminStudentServiceInterface {
    getStudents(studentsQuery: StudentInfosQueryRequest): Promise<StudentInfosQueryResponse>;
    getStudentDetail(studentId: string): Promise<StudentDetailResponse>;
    getStudentInfo(studentId: string): Promise<StudentInfoDto>
    getStudentBachelorThesisRegistration(studentId: string): Promise<BachelorThesisRegistrationDto>;
    getStudentBachelorThesisAssessment(studentId: string): Promise<BachelorThesisAssessmentDto>;
    getStudentBachelorThesisEvaluation(studentId: string): Promise<BachelorThesisEvaluationDto>;
    getStudentOralDefenseRegistration(studentId: string): Promise<OralDefenseRegistrationDto>;
    getStudentOralDefenseAssessment(studentId: string): Promise<OralDefenseAssessmentDto>;
    updateStudent(studentId: string, updateRequest: StudentInfoUpdateRequest): Promise<StudentInfoDto>;
}