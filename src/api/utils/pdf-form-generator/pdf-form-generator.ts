import { inject, injectable } from "inversify";
import { 
    BachelorThesisAssessmentDto, 
    BachelorThesisEvaluationDto, 
    BachelorThesisRegistrationDto, 
    OralDefenseAssessmentDto, 
    OralDefenseRegistrationDto 
} from "../../../shared/dtos";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { 
    DateField, 
    FormField, 
    FormFillerInterface, 
    ImageButtonField, 
    NumberField, 
    NumberFieldOptions, 
    RadioButtonField, 
    TextField 
} from "../../../lib/form-filler";
import { ASSETS } from "../../constants/assets";
import { TEMPLATE_FIELDS } from "../../constants/template-fields";
import { PdfFormGeneratorInterface } from "./pdf-form-generator.interface";
import { DATETIME_FORMATS } from "../../constants/datetime";
import { LOCALES } from "../../constants/locales";
import { getWeekday } from "../../../utils/date-helpers";
import { Title } from "../../../contracts/constants/title";

@injectable()
export class PdfFormGenerator implements PdfFormGeneratorInterface {
    constructor(
        @inject(INJECTION_TOKENS.PdfFormFiller) private formFiller: FormFillerInterface) {

    }

    async generateBachelorThesisRegistration(data: BachelorThesisRegistrationDto): Promise<Buffer> {
        const fields: FormField[] = [];

        fields.push(new TextField(TEMPLATE_FIELDS.BachelorThesisRegistration.Surname, data.surname));
        fields.push(new TextField(TEMPLATE_FIELDS.BachelorThesisRegistration.Forename, data.forename));
        fields.push(new TextField(TEMPLATE_FIELDS.BachelorThesisRegistration.MatriculationNo, data.studentId));
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

        fields.push(new ImageButtonField(
            TEMPLATE_FIELDS.BachelorThesisRegistration.Signature, 
            data.studentSignature
            ));
        fields.push(new ImageButtonField(
            TEMPLATE_FIELDS.BachelorThesisRegistration.AssessorSignature, 
            data.supervisor1Signature
            ));
        fields.push(new ImageButtonField(
            TEMPLATE_FIELDS.BachelorThesisRegistration.CoAssessorSignature, 
            data.supervisor2Signature
            ));
        fields.push(new ImageButtonField(
            TEMPLATE_FIELDS.BachelorThesisRegistration.AuthorSignature, 
            data.studentSignature
            ));

        return this.formFiller.fill(ASSETS.Templates.BachelorThesisRegistration.path, fields);
    }

    async generateBachelorThesisAssessment(data: BachelorThesisAssessmentDto): Promise<Buffer> {
        const fields: FormField[] = [];
        const numberOptions: NumberFieldOptions = { format: { maximumFractionDigits: 2 } };

        fields.push(new TextField(TEMPLATE_FIELDS.BachelorThesisAssessment.TitleOfBachelorThesis, data.thesisTitle));
        fields.push(new TextField(TEMPLATE_FIELDS.BachelorThesisAssessment.FutherParticipants, data.furtherParticipants));
        fields.push(new TextField(TEMPLATE_FIELDS.BachelorThesisAssessment.Surname, data.surname));
        fields.push(new TextField(TEMPLATE_FIELDS.BachelorThesisAssessment.FirstExaminerName, data.supervisor1Title));
        fields.push(new TextField(TEMPLATE_FIELDS.BachelorThesisAssessment.SecondExaminerName, data.supervisor2Title));
        fields.push(new DateField(TEMPLATE_FIELDS.BachelorThesisAssessment.AssessmentDate, data.assessmentDate));
        fields.push(new TextField(TEMPLATE_FIELDS.BachelorThesisAssessment.Forename, data.forename));
        fields.push(new TextField(TEMPLATE_FIELDS.BachelorThesisAssessment.MatriculationNo, data.studentId));
        fields.push(new RadioButtonField(
            TEMPLATE_FIELDS.BachelorThesisAssessment.IndividualOrGroupStudy.Name,
            data.furtherParticipants 
                ? TEMPLATE_FIELDS.BachelorThesisAssessment.IndividualOrGroupStudy.Options.Group
                : TEMPLATE_FIELDS.BachelorThesisAssessment.IndividualOrGroupStudy.Options.Individual
            ));
        fields.push(new NumberField(TEMPLATE_FIELDS.BachelorThesisAssessment.FirstExaminerGrade, data.supervisor1Grade, numberOptions));
        fields.push(new NumberField(TEMPLATE_FIELDS.BachelorThesisAssessment.SecondExaminerGrade, data.supervisor2Grade, numberOptions));
        fields.push(new NumberField(TEMPLATE_FIELDS.BachelorThesisAssessment.OverallGrade, data.overallGrade, numberOptions));
        fields.push(new TextField(TEMPLATE_FIELDS.BachelorThesisAssessment.AssessmentOfTheBachelorThesis, data.assessmentDescription));

        fields.push(new ImageButtonField(
            TEMPLATE_FIELDS.BachelorThesisAssessment.Signature1stExaminer, 
            data.supervisor1Signature
            ));
        fields.push(new ImageButtonField(
            TEMPLATE_FIELDS.BachelorThesisAssessment.Signature2ndExaminer, 
            data.supervisor2Signature
            ));

        return this.formFiller.fill(ASSETS.Templates.BachelorThesisAssessment.path, fields);
    }

    async generateBachelorThesisEvaluation(data: BachelorThesisEvaluationDto): Promise<Buffer> {
        const fields: FormField[] = [];

        fields.push(new TextField(TEMPLATE_FIELDS.BachelorThesisEvaluation.Surname, data.surname));
        fields.push(new TextField(TEMPLATE_FIELDS.BachelorThesisEvaluation.ThesisTitle, data.thesisTitle));
        fields.push(new TextField(TEMPLATE_FIELDS.BachelorThesisEvaluation.MatriculationNo, data.studentId));
        fields.push(new TextField(TEMPLATE_FIELDS.BachelorThesisEvaluation.Forename, data.forename));
        if (data.title === Title.Mr) {
            fields.push(new RadioButtonField(
                TEMPLATE_FIELDS.BachelorThesisEvaluation.MrOrMs.Name,
                TEMPLATE_FIELDS.BachelorThesisEvaluation.MrOrMs.Options.Mr));
        }
        else if (data.title === Title.Ms) {
            fields.push(new RadioButtonField(
                TEMPLATE_FIELDS.BachelorThesisEvaluation.MrOrMs.Name,
                TEMPLATE_FIELDS.BachelorThesisEvaluation.MrOrMs.Options.Ms));
        }
        fields.push(new DateField(TEMPLATE_FIELDS.BachelorThesisEvaluation.Date, data.date));
        fields.push(new ImageButtonField(TEMPLATE_FIELDS.BachelorThesisEvaluation.Signature1stExaminer, data.supervisorSignature));

        return this.formFiller.fill(ASSETS.Templates.BachelorThesisEvaluation.path, fields);
    }

    async generateOralDefenseRegistration(data: OralDefenseRegistrationDto): Promise<Buffer> {
        const fields: FormField[] = [];
        const weekday = data.proposedDate ? getWeekday(data.proposedDate) : undefined;
        const timeConfig = { locale: LOCALES.EN, format: DATETIME_FORMATS.TIME_12HOUR };

        fields.push(new DateField(TEMPLATE_FIELDS.OralDefenseRegistration.DateReceived, data.dateReceived));
        fields.push(new DateField(TEMPLATE_FIELDS.OralDefenseRegistration.DateOfAdmission, data.admissionDate));
        fields.push(new TextField(TEMPLATE_FIELDS.OralDefenseRegistration.Surname, data.surname));
        fields.push(new TextField(TEMPLATE_FIELDS.OralDefenseRegistration.Forename, data.forename));
        fields.push(new TextField(TEMPLATE_FIELDS.OralDefenseRegistration.MatriculationNo, data.studentId));
        fields.push(new TextField(TEMPLATE_FIELDS.OralDefenseRegistration.FirstExaminerName, data.supervisor1Title));
        fields.push(new TextField(TEMPLATE_FIELDS.OralDefenseRegistration.SecondExaminerName, data.supervisor2Title));
        fields.push(new DateField(TEMPLATE_FIELDS.OralDefenseRegistration.Date, data.proposedDate));
        fields.push(new TextField(TEMPLATE_FIELDS.OralDefenseRegistration.Weekday, weekday));
        fields.push(new DateField(TEMPLATE_FIELDS.OralDefenseRegistration.Time, data.proposedDate, timeConfig));
        fields.push(new TextField(TEMPLATE_FIELDS.OralDefenseRegistration.Room, data.room));
        fields.push(new RadioButtonField(
            TEMPLATE_FIELDS.OralDefenseRegistration.AreSpectatorsAllowed.Name,
            data.areSpectatorsAllowed
                ? TEMPLATE_FIELDS.OralDefenseRegistration.AreSpectatorsAllowed.Options.Yes
                : TEMPLATE_FIELDS.OralDefenseRegistration.AreSpectatorsAllowed.Options.No
            ));
        fields.push(new RadioButtonField(
            TEMPLATE_FIELDS.OralDefenseRegistration.ConcernedAgreed.Name,
            data.concernedAgreed
                ? TEMPLATE_FIELDS.OralDefenseRegistration.ConcernedAgreed.Options.Yes
                : TEMPLATE_FIELDS.OralDefenseRegistration.ConcernedAgreed.Options.No
            ));
            
        fields.push(new ImageButtonField(
            TEMPLATE_FIELDS.OralDefenseRegistration.FirstExaminerSignature, 
            data.supervisor1Signature
            ));
        fields.push(new ImageButtonField(
            TEMPLATE_FIELDS.OralDefenseRegistration.SecondExaminerSignature, 
            data.supervisor2Signature
            ));

        return this.formFiller.fill(ASSETS.Templates.OralDefenseRegistration.path, fields);
    }

    async generateOralDefenseAssessment(data: OralDefenseAssessmentDto): Promise<Buffer> {
        const fields: FormField[] = [];
        const numberOptions: NumberFieldOptions = { format: { maximumFractionDigits: 2 } };

        fields.push(new TextField(TEMPLATE_FIELDS.OralDefenseAssessment.Record, data.record));
        fields.push(new TextField(TEMPLATE_FIELDS.OralDefenseAssessment.Surname, data.surname));
        fields.push(new TextField(TEMPLATE_FIELDS.OralDefenseAssessment.Forename, data.forename));
        fields.push(new DateField(TEMPLATE_FIELDS.OralDefenseAssessment.Date, data.dateDefense));
        fields.push(new DateField(TEMPLATE_FIELDS.OralDefenseAssessment.Start, data.startDate));
        fields.push(new DateField(TEMPLATE_FIELDS.OralDefenseAssessment.Finish, data.finishDate));
        fields.push(new TextField(TEMPLATE_FIELDS.OralDefenseAssessment.FirstExaminerName, data.supervisor1Title));
        fields.push(new TextField(TEMPLATE_FIELDS.OralDefenseAssessment.SecondExaminerName, data.supervisor2Title));
        fields.push(new NumberField(TEMPLATE_FIELDS.OralDefenseAssessment.FirstExaminerGrade, data.supervisor1Grade, numberOptions));
        fields.push(new NumberField(TEMPLATE_FIELDS.OralDefenseAssessment.SecondExaminerGrade, data.supervisor2Grade, numberOptions));
        fields.push(new NumberField(TEMPLATE_FIELDS.OralDefenseAssessment.OverallGrade, data.overallGrade, numberOptions));
        fields.push(new TextField(TEMPLATE_FIELDS.OralDefenseAssessment.MatriculationNo, data.studentId));
        fields.push(new TextField(TEMPLATE_FIELDS.OralDefenseAssessment.Place, data.placeDefense));
        fields.push(new DateField(TEMPLATE_FIELDS.OralDefenseAssessment.AssessmentDate, data.assessmentDate));
        fields.push(new RadioButtonField(
            TEMPLATE_FIELDS.OralDefenseAssessment.SufficientStateOfHealth.Name,
            data.stateOfHealth
                ? TEMPLATE_FIELDS.OralDefenseAssessment.SufficientStateOfHealth.Options.Yes
                : TEMPLATE_FIELDS.OralDefenseAssessment.SufficientStateOfHealth.Options.No
            ));

        fields.push(new ImageButtonField(
            TEMPLATE_FIELDS.OralDefenseAssessment.Signature1stExaminer, 
            data.supervisor1Signature
            ));
        fields.push(new ImageButtonField(
            TEMPLATE_FIELDS.OralDefenseAssessment.Signature2ndExaminer, 
            data.supervisor2Signature
            ));

        return this.formFiller.fill(ASSETS.Templates.OralDefenseAssessment.path, fields);
    }

    private addThesisTitleToBachelorThesisRegistration(fields: FormField[], data: BachelorThesisRegistrationDto) {
        fields.push(new TextField(TEMPLATE_FIELDS.BachelorThesisRegistration.TitleOfBachelorThesis[0], data.thesisTitle));
    }
}