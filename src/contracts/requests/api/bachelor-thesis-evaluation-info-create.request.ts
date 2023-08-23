import { Expose } from "class-transformer";
import { IsBoolean, IsDate, IsDefined, IsIn, IsNumber, IsOptional, IsString } from "class-validator";
import { TitleValues } from "../../constants/title";

export class BachelorThesisEvaluationInfoCreateRequest {
    @Expose()
    @IsDefined()
    @IsNumber()
    thesisId!: number;

    @Expose()
    @IsDefined()
    @IsString()
    studentId!: string;

    @Expose()
    @IsDefined()
    @IsString()
    supervisorId!: string;

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