import { 
    BachelorThesisAssessmentsQueryRequest,
    BachelorThesisEvaluationsQueryRequest,
    BachelorThesisRegistrationsQueryRequest,
    OralDefenseAssessmentsQueryRequest,
    OralDefenseRegistrationsQueryRequest
} from "../../contracts/requests";
import { 
    BachelorThesisAssessmentsQueryResponse, 
    BachelorThesisEvaluationsQueryResponse, 
    BachelorThesisRegistrationsQueryResponse, 
    OralDefenseAssessmentsQueryResponse, 
    OralDefenseRegistrationsQueryResponse
} from "../../contracts/responses";
import { 
    BachelorThesisAssessmentDto, 
    BachelorThesisEvaluationDto, 
    BachelorThesisRegistrationDto, 
    OralDefenseAssessmentDto, 
    OralDefenseRegistrationDto
} from "../../shared/dtos";

export interface AssetsServiceInterface {
    getLecturerBachelorThesisRegistrations(lecturerId: string, queryRequest: BachelorThesisRegistrationsQueryRequest)
        : Promise<BachelorThesisRegistrationsQueryResponse>;

    getLecturerBachelorThesisAssessments(lecturerId: string, queryRequest: BachelorThesisAssessmentsQueryRequest)
        : Promise<BachelorThesisAssessmentsQueryResponse>;

    getLecturerBachelorThesisEvaluations(lecturerId: string, queryRequest: BachelorThesisEvaluationsQueryRequest)
        : Promise<BachelorThesisEvaluationsQueryResponse>;

    getLecturerOralDefenseRegistrations(lecturerId: string, queryRequest: OralDefenseRegistrationsQueryRequest)
        : Promise<OralDefenseRegistrationsQueryResponse>;

    getLecturerOralDefenseAssessments(lecturerId: string, queryRequest: OralDefenseAssessmentsQueryRequest)
        : Promise<OralDefenseAssessmentsQueryResponse>;

    getStudentBachelorThesisRegistrations(studentId: string): Promise<BachelorThesisRegistrationDto[]>;

    getStudentBachelorThesisAssessments(studentId: string): Promise<BachelorThesisAssessmentDto[]>;

    getStudentBachelorThesisEvaluations(studentId: string): Promise<BachelorThesisEvaluationDto[]>;

    getStudentOralDefenseRegistrations(studentId: string): Promise<OralDefenseRegistrationDto[]>;

    getStudentOralDefenseAssessments(studentId: string): Promise<OralDefenseAssessmentDto[]>;
}