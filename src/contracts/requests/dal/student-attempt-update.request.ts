import { Expose } from "class-transformer";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class StudentAttemptUpdateRequest {
    @Expose()
    @IsOptional()
    @IsString()
    studentId?: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    attemptNo?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    thesisId?: number;

    @Expose()
    @IsOptional()
    @IsString()
    supervisor2Id?: string;

    @Expose()
    @IsOptional()
    @IsString()
    requestId?: string | null;

    @Expose()
    @IsOptional()
    @IsDate()
    submissionDeadline?: Date | null;

    @Expose()
    @IsOptional()
    @IsNumber()
    numberHardCopies?: number | null;

    @Expose()
    @IsOptional()
    @IsString()
    printRequirements?: string | null;
}