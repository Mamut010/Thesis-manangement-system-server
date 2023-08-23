import { Expose, Type } from "class-transformer";
import { IsDefined, IsOptional, ValidateNested } from "class-validator";
import { 
    StudentInfoDto,
    BachelorThesisAssessmentDto,
    BachelorThesisRegistrationDto,
    OralDefenseAssessmentDto,
    OralDefenseRegistrationDto,
    BachelorThesisEvaluationDto
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
    @Type(() => BachelorThesisRegistrationDto)
    bachelorThesisRegistration!: BachelorThesisRegistrationDto | null;

    @Expose()
    @IsOptional()
    @ValidateNested()
    @Type(() => BachelorThesisAssessmentDto)
    bachelorThesisAssessment!: BachelorThesisAssessmentDto | null;

    @Expose()
    @IsOptional()
    @ValidateNested()
    @Type(() => BachelorThesisEvaluationDto)
    bachelorThesisEvaluation!: BachelorThesisEvaluationDto | null;

    @Expose()
    @IsOptional()
    @ValidateNested()
    @Type(() => OralDefenseRegistrationDto)
    oralDefenseRegistration!: OralDefenseRegistrationDto | null;

    @Expose()
    @IsOptional()
    @ValidateNested()
    @Type(() => OralDefenseAssessmentDto)
    oralDefenseAssessment!: OralDefenseAssessmentDto | null;
}