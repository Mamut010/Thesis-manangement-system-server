import { Expose } from "class-transformer";
import { IsDate, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class StudentAttemptDto {
    @Expose()
    @IsDefined()
    @IsString()
    id!: string;

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
    @IsDefined()
    @IsString()
    supervisor1Id!: string;

    @Expose()
    @IsDefined()
    @IsString()
    supervisor2Id!: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    bachelorThesisRegistrationId?: number | null;

    @Expose()
    @IsOptional()
    @IsNumber()
    oralDefenseRegistrationId?: number | null;

    @Expose()
    @IsOptional()
    @IsNumber()
    bachelorThesisAssessmentId?: number | null;

    @Expose()
    @IsOptional()
    @IsNumber()
    oralDefenseAssessmentId?: number | null;

    @Expose()
    @IsOptional()
    @IsNumber()
    bachelorThesisEvaluationId?: number | null;

    @Expose()
    @IsOptional()
    @IsString()
    requestId?: string | null;

    @Expose()
    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @Expose()
    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}