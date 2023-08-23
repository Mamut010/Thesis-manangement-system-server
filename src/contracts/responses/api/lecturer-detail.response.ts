import { Expose, Type } from "class-transformer";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import {
    BachelorThesisAssessmentInfoDto,
    BachelorThesisEvaluationInfoDto,
    BachelorThesisRegistrationInfoDto,
    LecturerInfoDto,
    OralDefenseAssessmentInfoDto,
    OralDefenseRegistrationInfoDto
} from "../../../shared/dtos";

export class LecturerDetailResponse {
    @Expose()
    @IsDefined()
    @ValidateNested()
    @Type(() => LecturerInfoDto)
    lecturerInfo!: LecturerInfoDto;

    @Expose()
    @IsArray()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => BachelorThesisRegistrationInfoDto)
    bachelorThesisRegistrations!: BachelorThesisRegistrationInfoDto[];

    @Expose()
    @IsArray()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => BachelorThesisAssessmentInfoDto)
    bachelorThesisAssessments!: BachelorThesisAssessmentInfoDto[];

    @Expose()
    @IsArray()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => BachelorThesisEvaluationInfoDto)
    bachelorThesisEvaluations!: BachelorThesisEvaluationInfoDto[];

    @Expose()
    @IsArray()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => OralDefenseRegistrationInfoDto)
    oralDefenseRegistrations!: OralDefenseRegistrationInfoDto[];

    @Expose()
    @IsArray()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => OralDefenseAssessmentInfoDto)
    oralDefenseAssessments!: OralDefenseAssessmentInfoDto[];
}