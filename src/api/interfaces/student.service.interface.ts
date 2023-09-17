import { StudentInfoUpdateRequest, StudentInfosQueryRequest } from "../../contracts/requests";
import { ThesisRequestCreateRequest } from "../../contracts/requests/api/thesis-request-create.request";
import { StudentDetailResponse, StudentInfosQueryResponse } from "../../contracts/responses";
import { 
    BachelorThesisAssessmentInfoDto, 
    BachelorThesisEvaluationInfoDto, 
    BachelorThesisRegistrationInfoDto, 
    OralDefenseAssessmentInfoDto, 
    OralDefenseRegistrationInfoDto, 
    RequestStateInfoDto, 
    StudentInfoDto 
} from "../../shared/dtos";

export interface StudentServiceInterface {
    getStudents(studentsQuery: StudentInfosQueryRequest): Promise<StudentInfosQueryResponse>;

    getStudentDetail(studentId: string): Promise<StudentDetailResponse>;

    getStudentInfo(studentId: string): Promise<StudentInfoDto>;

    getStudentBachelorThesisRegistrations(studentId: string): Promise<BachelorThesisRegistrationInfoDto[]>;

    getStudentBachelorThesisAssessments(studentId: string): Promise<BachelorThesisAssessmentInfoDto[]>;

    getStudentBachelorThesisEvaluations(studentId: string): Promise<BachelorThesisEvaluationInfoDto[]>;

    getStudentOralDefenseRegistrations(studentId: string): Promise<OralDefenseRegistrationInfoDto[]>;

    getStudentOralDefenseAssessments(studentId: string): Promise<OralDefenseAssessmentInfoDto[]>;

    updateStudentInfo(studentId: string, updateRequest: StudentInfoUpdateRequest): Promise<StudentInfoDto>;

    createThesisRequest(userId: string, request: ThesisRequestCreateRequest): Promise<RequestStateInfoDto>;
    
    getLatestCreatedRequestState(userId: string): Promise<RequestStateInfoDto>;
}