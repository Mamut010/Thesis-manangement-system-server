import { BachelorThesisEvaluationDto, BachelorThesisRegistrationDto } from "../../../shared/dtos";

export interface PdfFormGeneratorInterface {
    generateBachelorThesisRegistration(data: BachelorThesisRegistrationDto): Promise<Buffer>;
    generateBachelorThesisEvaluation(data: BachelorThesisEvaluationDto): Promise<Buffer>
}