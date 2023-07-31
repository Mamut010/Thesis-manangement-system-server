import { Expose, Type } from "class-transformer";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import {
    BachelorThesisAssessmentDto,
    BachelorThesisRegistrationDto,
    LecturerInfoDto,
    OralDefenseAssessmentDto,
    OralDefenseRegistrationDto
} from "../../shared/dtos";

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
    @Type(() => BachelorThesisRegistrationDto)
    bachelorThesisRegistrations!: BachelorThesisRegistrationDto[];

    @Expose()
    @IsArray()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => OralDefenseRegistrationDto)
    oralDefenseRegistrations!: OralDefenseRegistrationDto[];

    @Expose()
    @IsArray()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => BachelorThesisAssessmentDto)
    bachelorThesisAssessments!: BachelorThesisAssessmentDto[];

    @Expose()
    @IsArray()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => OralDefenseAssessmentDto)
    oralDefenseAssessments!: OralDefenseAssessmentDto[];
}