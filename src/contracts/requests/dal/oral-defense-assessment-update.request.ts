import { Expose, Type } from "class-transformer";
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class OralDefenseAssessmentUpdateRequest {
    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    dateDefense?: Date | null;

    @Expose()
    @IsOptional()
    @IsString()
    placeDefense?: string | null;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    startDate?: Date | null;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    finishDate?: Date | null;

    @Expose()
    @IsOptional()
    @IsBoolean()
    stateOfHealth?: boolean | null;

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
    record?: string | null;

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