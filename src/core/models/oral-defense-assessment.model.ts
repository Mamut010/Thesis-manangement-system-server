import { Expose } from "class-transformer";
import { IsBoolean, IsDate, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class OralDefenseAssessment {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsDefined()
    @IsString()
    studentAttemptId!: string;

    @Expose()
    @IsOptional()
    @IsDate()
    dateDefense!: Date | null;

    @Expose()
    @IsOptional()
    @IsString()
    placeDefense!: string | null;

    @Expose()
    @IsOptional()
    @IsDate()
    startDate!: Date | null;

    @Expose()
    @IsOptional()
    @IsDate()
    finishDate!: Date | null;

    @Expose()
    @IsOptional()
    @IsBoolean()
    stateOfHealth!: boolean | null;

    @Expose()
    @IsOptional()
    @IsNumber()
    supervisor1Grade!: number | null;

    @Expose()
    @IsOptional()
    @IsNumber()
    supervisor2Grade!: number | null;

    @Expose()
    @IsOptional()
    @IsString()
    record!: string | null;

    @Expose()
    @IsOptional()
    @IsDate()
    assessmentDate!: Date | null;

    @Expose()
    @IsDefined()
    @IsBoolean()
    supervisor1Confirmed!: boolean;

    @Expose()
    @IsDefined()
    @IsBoolean()
    supervisor2Confirmed!: boolean;

    @Expose()
    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @Expose()
    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}