import { Expose } from "class-transformer";
import { IsDate, IsDefined, IsIn, IsNumber, IsOptional, IsString } from "class-validator";
import { TitleValues } from "../../constants/title";

export class BachelorThesisEvaluationInfoCreateRequest {
    @Expose()
    @IsDefined()
    @IsString()
    studentId!: string;

    @Expose()
    @IsDefined()
    @IsNumber()
    attemptNo!: number;

    @Expose()
    @IsOptional()
    @IsString()
    @IsIn(TitleValues)
    title?: string;

    @Expose()
    @IsOptional()
    @IsDate()
    date?: Date
}