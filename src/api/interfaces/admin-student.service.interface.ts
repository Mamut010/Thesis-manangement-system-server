import { StudentInfoUpdateRequest } from "../../contracts/requests/api/student-info-update.request";
import { StudentInfosQueryRequest } from "../../contracts/requests/api/student-infos-query.request";
import { StudentDetailResponse } from "../../contracts/responses/api/student-detail.response";
import { StudentInfosQueryResponse } from "../../contracts/responses/api/student-infos-query.response";
import { 
    BachelorThesisAssessmentInfoDto, 
    BachelorThesisEvaluationInfoDto, 
    BachelorThesisRegistrationInfoDto,
    OralDefenseAssessmentInfoDto, 
    OralDefenseRegistrationInfoDto, 
    StudentInfoDto
} from "../../shared/dtos";

export interface AdminStudentServiceInterface {
    getStudents(studentsQuery: StudentInfosQueryRequest): Promise<StudentInfosQueryResponse>;
    getStudentDetail(studentId: string): Promise<StudentDetailResponse>;
    getStudentInfo(studentId: string): Promise<StudentInfoDto>
    getStudentBachelorThesisRegistration(studentId: string): Promise<BachelorThesisRegistrationInfoDto>;
    getStudentBachelorThesisAssessment(studentId: string): Promise<BachelorThesisAssessmentInfoDto>;
    getStudentBachelorThesisEvaluation(studentId: string): Promise<BachelorThesisEvaluationInfoDto>;
    getStudentOralDefenseRegistration(studentId: string): Promise<OralDefenseRegistrationInfoDto>;
    getStudentOralDefenseAssessment(studentId: string): Promise<OralDefenseAssessmentInfoDto>;
    updateStudent(studentId: string, updateRequest: StudentInfoUpdateRequest): Promise<StudentInfoDto>;
}