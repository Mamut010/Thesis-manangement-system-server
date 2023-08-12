import { BachelorThesisRegistrationDto } from "../../../shared/dtos";

export interface PdfFormGeneratorInterface {
    generateBachelorThesisRegistration(data: BachelorThesisRegistrationDto): Promise<Buffer>;
}