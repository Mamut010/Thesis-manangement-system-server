import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

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
}