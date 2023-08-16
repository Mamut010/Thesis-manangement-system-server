import { 
    BachelorThesisAssessmentDto, 
    BachelorThesisEvaluationDto, 
    BachelorThesisRegistrationDto, 
    OralDefenseAssessmentDto
} from "../../../shared/dtos";

export interface PdfFormGeneratorInterface {
    generateBachelorThesisRegistration(data: BachelorThesisRegistrationDto): Promise<Buffer>;
    generateBachelorThesisAssessment(data: BachelorThesisAssessmentDto): Promise<Buffer>;
    generateBachelorThesisEvaluation(data: BachelorThesisEvaluationDto): Promise<Buffer>;
    generateOralDefenseAssessment(data: OralDefenseAssessmentDto): Promise<Buffer>;
}