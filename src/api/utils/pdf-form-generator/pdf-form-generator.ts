/* eslint-disable */

import { inject, injectable } from "inversify";
import { BachelorThesisRegistrationDto } from "../../../shared/dtos";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { 
    DateField, 
    FormField, 
    FormFillerInterface, 
    ImageButtonField, 
    RadioButtonField, 
    TextField 
} from "../../../lib/form-filler";
import { ASSETS } from "../../constants/assets";
import { TEMPLATE_FIELDS } from "../../constants/template-fields";
import { PdfFormGeneratorInterface } from "./pdf-form-generator.interface";
import { PrismaClient } from "@prisma/client";

@injectable()
export class PdfFormGenerator implements PdfFormGeneratorInterface {
    constructor(
        @inject(INJECTION_TOKENS.PdfFormFiller) private pdfFormFiller: FormFillerInterface,
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient) {

    }

    async generateBachelorThesisRegistration(data: BachelorThesisRegistrationDto): Promise<Buffer> {
        const fields: FormField[] = [];

        fields.push(new TextField(TEMPLATE_FIELDS.BachelorThesisRegistration.Surname, data.surname));
        fields.push(new TextField(TEMPLATE_FIELDS.BachelorThesisRegistration.Forename, data.forename));
        fields.push(new TextField(TEMPLATE_FIELDS.BachelorThesisRegistration.MatriculationNo, data.studentId.toString()));
        fields.push(new DateField(TEMPLATE_FIELDS.BachelorThesisRegistration.DateOfBirth, data.dateOfBirth));
        fields.push(new TextField(TEMPLATE_FIELDS.BachelorThesisRegistration.PlaceOfBirth, data.placeOfBirth));
        fields.push(new TextField(TEMPLATE_FIELDS.BachelorThesisRegistration.FurtherParticipants, data.furtherParticipants));
        fields.push(new RadioButtonField(
            TEMPLATE_FIELDS.BachelorThesisRegistration.IndividualOrGroupStudy.Name,
            data.furtherParticipants 
                ? TEMPLATE_FIELDS.BachelorThesisRegistration.IndividualOrGroupStudy.Options.Group
                : TEMPLATE_FIELDS.BachelorThesisRegistration.IndividualOrGroupStudy.Options.Individual
            ));
        fields.push(new TextField(TEMPLATE_FIELDS.BachelorThesisRegistration.Assessor, data.supervisor1Title));
        fields.push(new DateField(TEMPLATE_FIELDS.BachelorThesisRegistration.AssessorDate, data.supervisor1Date));
        fields.push(new TextField(TEMPLATE_FIELDS.BachelorThesisRegistration.CoAssessor, data.supervisor2Title));
        fields.push(new DateField(TEMPLATE_FIELDS.BachelorThesisRegistration.CoAssessorDate, data.supervisor2Date));
        fields.push(new DateField(TEMPLATE_FIELDS.BachelorThesisRegistration.AuthorDate, data.studentDate));
        fields.push(new DateField(TEMPLATE_FIELDS.BachelorThesisRegistration.Issued, data.issued));
        fields.push(new DateField(TEMPLATE_FIELDS.BachelorThesisRegistration.DeadlineCopy, data.deadlineCopy));
        fields.push(new TextField(TEMPLATE_FIELDS.BachelorThesisRegistration.ChairmanOfExamination, data.chairmanOfExamination));
        fields.push(new DateField(TEMPLATE_FIELDS.BachelorThesisRegistration.DateOfIssue, data.dateOfIssue));
        fields.push(new DateField(TEMPLATE_FIELDS.BachelorThesisRegistration.ExtensionGrantedUntil, data.extensionGranted));
        
        this.addThesisTitleToBachelorThesisRegistration(fields, data);

        const signatures = await this.getSignatures('bachelorThesisRegistration', data.id);
        fields.push(new ImageButtonField(
            TEMPLATE_FIELDS.BachelorThesisRegistration.Signature, 
            signatures.studentSignature
            ));
        fields.push(new ImageButtonField(
            TEMPLATE_FIELDS.BachelorThesisRegistration.AssessorSignature, 
            signatures.supervisor1Signature
            ));
        fields.push(new ImageButtonField(
            TEMPLATE_FIELDS.BachelorThesisRegistration.CoAssessorSignature, 
            signatures.supervisor2Signature
            ));
        fields.push(new ImageButtonField(
            TEMPLATE_FIELDS.BachelorThesisRegistration.AuthorSignature, 
            signatures.studentSignature
            ));

        return this.pdfFormFiller.fill(ASSETS.Templates.BachelorThesisRegistration.path, fields);
    }

    private addThesisTitleToBachelorThesisRegistration(fields: FormField[], data: BachelorThesisRegistrationDto) {
        fields.push(new TextField(TEMPLATE_FIELDS.BachelorThesisRegistration.TitleOfBachelorThesis[0], data.thesisTitle));
    }

    private async getSignatures(model: 'bachelorThesisRegistration' | 'bachelorThesisAssessment', id: number) {
        const signatures = await (this.prisma[model] as any).findUniqueOrThrow({
            where: { id },
            select: {
                student: { select: { user: { select: { signature: true } } } },
                supervisor1: { select: { user: { select: { signature: true } } } },
                supervisor2: { select: { user: { select: { signature: true } } } } 
            }
        });

        return {
            studentSignature: signatures.student.user.signature as string | null,
            supervisor1Signature: signatures.supervisor1?.user.signature as string | null | undefined,
            supervisor2Signature: signatures.supervisor2?.user.signature as string | null | undefined,
        }
    }
}