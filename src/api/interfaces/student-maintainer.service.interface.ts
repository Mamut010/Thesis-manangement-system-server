import { StudentInfoUpdateRequest } from "../../contracts/requests";
import { StudentDetailResponse } from "../../contracts/responses";
import { 
    BachelorThesisAssessmentInfoDto, 
    BachelorThesisEvaluationInfoDto, 
    BachelorThesisRegistrationInfoDto, 
    OralDefenseAssessmentInfoDto, 
    OralDefenseRegistrationInfoDto, 
    StudentInfoDto 
} from "../../shared/dtos";

export interface StudentMaintainerServiceInterface {
    getStudentDetail(studentId: string): Promise<StudentDetailResponse>;
    getStudentInfo(studentId: string): Promise<StudentInfoDto>;
    getStudentBachelorThesisRegistration(studentId: string): Promise<BachelorThesisRegistrationInfoDto>;
    getStudentBachelorThesisAssessment(studentId: string): Promise<BachelorThesisAssessmentInfoDto>;
    getStudentBachelorThesisEvaluation(studentId: string): Promise<BachelorThesisEvaluationInfoDto>;
    getStudentOralDefenseRegistration(studentId: string): Promise<OralDefenseRegistrationInfoDto>;
    getStudentOralDefenseAssessment(studentId: string): Promise<OralDefenseAssessmentInfoDto>;
    updateStudentInfo(studentId: string, updateRequest: StudentInfoUpdateRequest): Promise<StudentInfoDto>;
}