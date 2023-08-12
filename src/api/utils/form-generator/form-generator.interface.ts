import { BachelorThesisRegistrationDto } from "../../../shared/dtos";

export interface FormGeneratorInterface {
    generateBachelorThesisRegistration(data: BachelorThesisRegistrationDto): Promise<Buffer>;
}