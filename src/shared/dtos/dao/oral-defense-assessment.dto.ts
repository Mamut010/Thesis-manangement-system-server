import { Expose } from "class-transformer";
import { IsBoolean, IsDate, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class OralDefenseAssessmentDto {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsDefined()
    @IsString()
    studentId!: string;

    @Expose()
    @IsDefined()
    @IsNumber()
    attemptNo!: number;

    @Expose()
    @IsDefined()
    @IsNumber()
    thesisId!: number;

    @Expose()
    @IsOptional()
    @IsString()
    surname?: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    forename?: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    studentSignature?: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    thesisTitle?: string | null;

    @Expose()
    @IsOptional()
    @IsDate()
    dateDefense?: Date | null;

    @Expose()
    @IsOptional()
    @IsString()
    placeDefense?: string | null;

    @Expose()
    @IsOptional()
    @IsDate()
    startDate?: Date | null;

    @Expose()
    @IsOptional()
    @IsDate()
    finishDate?: Date | null;

    @Expose()
    @IsOptional()
    @IsBoolean()
    stateOfHealth?: boolean | null;

    @Expose()
    @IsOptional()
    @IsString()
    supervisor1Id?: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    supervisor1Title?: string | null;

    @Expose()
    @IsOptional()
    @IsNumber()
    supervisor1Grade?: number | null;

    @Expose()
    @IsOptional()
    @IsString()
    supervisor1Signature?: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    supervisor2Id?: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    supervisor2Title?: string | null;

    @Expose()
    @IsOptional()
    @IsNumber()
    supervisor2Grade?: number | null;

    @Expose()
    @IsOptional()
    @IsString()
    supervisor2Signature?: string | null;

    @Expose()
    @IsOptional()
    @IsNumber()
    overallGrade?: number | null;

    @Expose()
    @IsOptional()
    @IsString()
    record?: string | null;

    @Expose()
    @IsOptional()
    @IsDate()
    assessmentDate?: Date | null;

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