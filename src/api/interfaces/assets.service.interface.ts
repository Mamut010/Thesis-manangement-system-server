import { 
    BachelorThesisAssessmentsQueryRequest,
    BachelorThesisEvaluationsQueryRequest,
    BachelorThesisRegistrationsQueryRequest,
    OralDefenseAssessmentsQueryRequest,
    OralDefenseRegistrationsQueryRequest
} from "../../contracts/requests";
import { 
    BachelorThesisAssessmentDto,
    BachelorThesisEvaluationDto,
    BachelorThesisRegistrationDto,
    OralDefenseAssessmentDto,
    OralDefenseRegistrationDto
} from "../../shared/dtos";

export interface AssetsServiceInterface {
    getLecturerBachelorThesisRegistrations(lecturerId: string, queryRequest: BachelorThesisRegistrationsQueryRequest)
        : Promise<BachelorThesisRegistrationDto[]>;

    getLecturerBachelorThesisAssessments(lecturerId: string, queryRequest: BachelorThesisAssessmentsQueryRequest)
        : Promise<BachelorThesisAssessmentDto[]>;

    getLecturerBachelorThesisEvaluations(lecturerId: string, queryRequest: BachelorThesisEvaluationsQueryRequest)
        : Promise<BachelorThesisEvaluationDto[]>;

    getLecturerOralDefenseRegistrations(lecturerId: string, queryRequest: OralDefenseRegistrationsQueryRequest)
        : Promise<OralDefenseRegistrationDto[]>;

    getLecturerOralDefenseAssessments(lecturerId: string, queryRequest: OralDefenseAssessmentsQueryRequest)
        : Promise<OralDefenseAssessmentDto[]>;

    getStudentBachelorThesisRegistration(studentId: string): Promise<BachelorThesisRegistrationDto | null>;

    getStudentBachelorThesisAssessment(studentId: string): Promise<BachelorThesisAssessmentDto | null>;

    getStudentBachelorThesisEvaluation(studentId: string): Promise<BachelorThesisEvaluationDto | null>;

    getStudentOralDefenseRegistration(studentId: string): Promise<OralDefenseRegistrationDto | null>;

    getStudentOralDefenseAssessment(studentId: string): Promise<OralDefenseAssessmentDto | null>;
}