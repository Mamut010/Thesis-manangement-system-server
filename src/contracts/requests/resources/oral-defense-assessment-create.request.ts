import { Expose } from "class-transformer";
import { IsBoolean, IsDate, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class OralDefenseAssessmentCreateRequest {
    @Expose()
    @IsDefined()
    @IsNumber()
    thesisId!: number;

    @Expose()
    @IsDefined()
    @IsNumber()
    studentId!: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    supervisor1Id?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    supervisor2Id?: number;

    @Expose()
    @IsOptional()
    @IsDate()
    dateDefense?: Date;

    @Expose()
    @IsOptional()
    @IsString()
    placeDefense?: string;

    @Expose()
    @IsOptional()
    @IsDate()
    startDate?: Date;

    @Expose()
    @IsOptional()
    @IsDate()
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
    assessmentDate?: Date;
}