import { Expose, Type } from "class-transformer";
import { IsDate, IsDefined, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class RequestAssociatedForms {
    @Expose()
    @IsOptional()
    @IsNumber()
    bachelorThesisRegistrationId?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    oralDefenseRegistrationId?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    bachelorThesisAssessmentId?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    oralDefenseAssessmentId?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    bachelorThesisEvaluationId?: number;
}

export class RequestAssociatedDataResponse {
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
    @IsDefined()
    @ValidateNested()
    @Type(() => RequestAssociatedForms)
    forms!: RequestAssociatedForms;

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
    startedAt!: Date;
}