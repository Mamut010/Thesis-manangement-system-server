import { Expose } from "class-transformer";
import { IsBoolean, IsDate, IsIn, IsNumber, IsOptional, IsString } from "class-validator";
import { TitleValues } from "../../constants/title";

export class BachelorThesisEvaluationUpdateRequest {
    @Expose()
    @IsOptional()
    @IsNumber()
    thesisId!: number;

    @Expose()
    @IsOptional()
    @IsString()
    studentId?: string;

    @Expose()
    @IsOptional()
    @IsString()
    supervisorId?: string;

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