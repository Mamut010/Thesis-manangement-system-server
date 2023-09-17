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
    @ValidateNested({ each: true })
    @Type(() => BachelorThesisRegistrationInfoDto)
    bachelorThesisRegistrations!: BachelorThesisRegistrationInfoDto[];

    @Expose()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => BachelorThesisAssessmentInfoDto)
    bachelorThesisAssessments!: BachelorThesisAssessmentInfoDto[];

    @Expose()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => BachelorThesisEvaluationInfoDto)
    bachelorThesisEvaluations!: BachelorThesisEvaluationInfoDto[];

    @Expose()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => OralDefenseRegistrationInfoDto)
    oralDefenseRegistrations!: OralDefenseRegistrationInfoDto[];

    @Expose()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => OralDefenseAssessmentInfoDto)
    oralDefenseAssessments!: OralDefenseAssessmentInfoDto[];
}