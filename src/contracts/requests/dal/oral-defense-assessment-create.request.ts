import { Expose, Type } from "class-transformer";
import { IsBoolean, IsDate, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class OralDefenseAssessmentCreateRequest {
    @Expose()
    @IsDefined()
    @IsString()
    studentId!: string;

    @Expose()
    @IsDefined()
    @IsNumber()
    attemptNo!: number;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    dateDefense?: Date;

    @Expose()
    @IsOptional()
    @IsString()
    placeDefense?: string;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    startDate?: Date;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    finishDate?: Date;

    @Expose()
    @IsOptional()
    @IsBoolean()
    stateOfHealth?: boolean;

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
    record?: string;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    assessmentDate?: Date;

    @Expose()
    @IsOptional()
    @IsBoolean()
    supervisor1Confirmed?: boolean;

    @Expose()
    @IsOptional()
    @IsBoolean()
    supervisor2Confirmed?: boolean;
}