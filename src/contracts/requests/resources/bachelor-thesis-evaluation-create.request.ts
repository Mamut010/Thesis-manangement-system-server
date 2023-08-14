import { Expose } from "class-transformer";
import { IsBoolean, IsDate, IsDefined, IsIn, IsNumber, IsOptional, IsString } from "class-validator";
import { TitleValues } from "../../constants/title";

export class BachelorThesisEvaluationCreateRequest {
    @Expose()
    @IsDefined()
    @IsNumber()
    thesisId!: number;

    @Expose()
    @IsDefined()
    @IsNumber()
    studentId!: number;

    @Expose()
    @IsDefined()
    @IsNumber()
    supervisorId!: number;

    @Expose()
    @IsOptional()
    @IsString()
    @IsIn(TitleValues)
    title?: string;

    @Expose()
    @IsOptional()
    @IsDate()
    date?: Date

    @Expose()
    @IsOptional()
    @IsBoolean()
    supervisorConfirmed?: boolean;
}