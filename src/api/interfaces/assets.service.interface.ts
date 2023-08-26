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
        : Promise<OralDefenseAssessmentDto[]>
}