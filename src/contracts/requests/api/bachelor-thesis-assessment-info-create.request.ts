import { Expose, Type } from "class-transformer";
import { IsDate, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class BachelorThesisAssessmentInfoCreateRequest {
    @Expose()
    @IsDefined()
    @IsNumber()
    thesisId!: number;

    @Expose()
    @IsDefined()
    @IsString()
    studentId!: string;

    @Expose()
    @IsOptional()
    @IsString()
    supervisor1Id?: string;

    @Expose()
    @IsOptional()
    @IsString()
    supervisor2Id?: string;

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