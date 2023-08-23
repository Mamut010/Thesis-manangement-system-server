import { Expose, Type } from "class-transformer";
import { IsDefined, IsOptional, ValidateNested } from "class-validator";
import { 
    StudentInfoDto,
    BachelorThesisAssessmentInfoDto,
    BachelorThesisRegistrationInfoDto,
    OralDefenseAssessmentInfoDto,
    OralDefenseRegistrationInfoDto,
    BachelorThesisEvaluationInfoDto
} from "../../../shared/dtos";

export class StudentDetailResponse {
    @Expose()
    @IsDefined()
    @ValidateNested()
    @Type(() => StudentInfoDto)
    studentInfo!: StudentInfoDto;

    @Expose()
    @IsOptional()
    @ValidateNested()
    @Type(() => BachelorThesisRegistrationInfoDto)
    bachelorThesisRegistration!: BachelorThesisRegistrationInfoDto | null;

    @Expose()
    @IsOptional()
    @ValidateNested()
    @Type(() => BachelorThesisAssessmentInfoDto)
    bachelorThesisAssessment!: BachelorThesisAssessmentInfoDto | null;

    @Expose()
    @IsOptional()
    @ValidateNested()
    @Type(() => BachelorThesisEvaluationInfoDto)
    bachelorThesisEvaluation!: BachelorThesisEvaluationInfoDto | null;

    @Expose()
    @IsOptional()
    @ValidateNested()
    @Type(() => OralDefenseRegistrationInfoDto)
    oralDefenseRegistration!: OralDefenseRegistrationInfoDto | null;

    @Expose()
    @IsOptional()
    @ValidateNested()
    @Type(() => OralDefenseAssessmentInfoDto)
    oralDefenseAssessment!: OralDefenseAssessmentInfoDto | null;
}