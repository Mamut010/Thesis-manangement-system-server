import { Expose, Type } from "class-transformer";
import { IsDate, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class BachelorThesisAssessmentCreateRequest {
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
    @IsString()
    furtherParticipants?: string;

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
    assessmentDescription?: string;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    assessmentDate?: Date;
}