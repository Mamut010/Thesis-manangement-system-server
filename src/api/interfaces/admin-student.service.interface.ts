import { StudentInfoUpdateRequest, StudentInfosQueryRequest } from "../../contracts/requests";
import { StudentDetailResponse, StudentInfosQueryResponse } from "../../contracts/responses";
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