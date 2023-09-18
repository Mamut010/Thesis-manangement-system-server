import { Expose, Type } from "class-transformer";
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class BachelorThesisAssessmentUpdateRequest {
    @Expose()
    @IsOptional()
    @IsString()
    furtherParticipants?: string | null;

    @Expose()
    @IsOptional()
    @IsNumber()
    supervisor1Grade?: number | null;

    @Expose()
    @IsOptional()
    @IsNumber()
    supervisor2Grade?: number | null;

    @Expose()
    @IsOptional()
    @IsString()
    assessmentDescription?: string | null;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    assessmentDate?: Date | null;

    @Expose()
    @IsOptional()
    @IsBoolean()
    supervisor1Confirmed?: boolean;

    @Expose()
    @IsOptional()
    @IsBoolean()
    supervisor2Confirmed?: boolean;
}