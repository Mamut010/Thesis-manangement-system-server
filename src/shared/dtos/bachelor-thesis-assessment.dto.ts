import { Expose } from "class-transformer";
import { IsDate, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class BachelorThesisAssessmentDto {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsDefined()
    @IsNumber()
    studentId!: number;

    @Expose()
    @IsDefined()
    @IsNumber()
    thesisId!: number;

    @Expose()
    @IsOptional()
    @IsString()
    surname!: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    forename!: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    thesisTitle!: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    furtherParticipants!: string | null;

    @Expose()
    @IsOptional()
    @IsNumber()
    supervisor1Id!: number | null;

    @Expose()
    @IsOptional()
    @IsString()
    supervisor1Title!: string | null;

    @Expose()
    @IsOptional()
    @IsNumber()
    supervisor1Grade!: number | null;

    @Expose()
    @IsOptional()
    @IsNumber()
    supervisor2Id!: number | null;

    @Expose()
    @IsOptional()
    @IsString()
    supervisor2Title!: string | null;

    @Expose()
    @IsOptional()
    @IsNumber()
    supervisor2Grade!: number | null;

    @Expose()
    @IsOptional()
    @IsNumber()
    overallGrade!: number | null;

    @Expose()
    @IsOptional()
    @IsString()
    assessmentDescription!: string | null;

    @Expose()
    @IsOptional()
    @IsDate()
    assessmentDate!: Date | null;
}