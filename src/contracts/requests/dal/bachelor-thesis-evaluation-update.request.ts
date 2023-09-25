import { Expose } from "class-transformer";
import { IsDate, IsOptional } from "class-validator";

export class BachelorThesisEvaluationUpdateRequest {
    @Expose()
    @IsOptional()
    @IsDate()
    date?: Date;
}