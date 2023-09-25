import { Expose } from "class-transformer";
import { IsDate, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class StudentAttemptCreateRequest {
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
    supervisor2Id!: string;

    @Expose()
    @IsOptional()
    @IsString()
    requestId?: string;

    @Expose()
    @IsOptional()
    @IsDate()
    submissionDeadline?: Date;

    @Expose()
    @IsOptional()
    @IsNumber()
    numberHardCopies?: number;

    @Expose()
    @IsOptional()
    @IsString()
    printRequirements?: string;
}