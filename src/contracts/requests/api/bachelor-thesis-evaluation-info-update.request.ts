import { Expose } from "class-transformer";
import { IsDate, IsOptional } from "class-validator";
import { TitleValues } from "../../constants/title";

export class BachelorThesisEvaluationInfoUpdateRequest {
    @Expose()
    @IsOptional()
    @IsDate()
    date?: Date;
}