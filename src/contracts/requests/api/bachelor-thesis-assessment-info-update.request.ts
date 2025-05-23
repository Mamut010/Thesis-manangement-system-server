import { Expose, Type } from "class-transformer";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class BachelorThesisAssessmentInfoUpdateRequest {
    @Expose()
    @IsOptional()
    @IsString()
    furtherParticipants?: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    supervisor1Grade?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    supervisor2Grade?: number;

    @Expose()
    @IsOptional()
    @IsString()
    assessmentDescription?: string;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    assessmentDate?: Date;
}