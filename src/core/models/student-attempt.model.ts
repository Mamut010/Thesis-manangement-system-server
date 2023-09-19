import { Expose } from "class-transformer";
import { IsDate, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class StudentAttempt {
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
    supervisor2Id!: string;

    @Expose()
    @IsOptional()
    @IsDate()
    submissionDeadline!: Date | null;

    @Expose()
    @IsOptional()
    @IsNumber()
    numberHardCopies!: number | null;

    @Expose()
    @IsOptional()
    @IsString()
    printRequirements!: string | null;

    @Expose()
    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @Expose()
    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}