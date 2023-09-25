import { Expose } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class RequestAssociatedFormsResponse {
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