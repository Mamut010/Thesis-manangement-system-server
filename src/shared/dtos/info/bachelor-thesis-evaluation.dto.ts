import { Expose } from "class-transformer";
import { IsDate, IsDefined, IsIn, IsNumber, IsOptional, IsString } from "class-validator";
import { Title, TitleValues } from "../../../contracts/constants/title";

export class BachelorThesisEvaluationInfoDto {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

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
    supervisorId!: string;

    @Expose()
    @IsOptional()
    @IsString()
    surname?: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    forename?: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    thesisTitle?: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    supervisorTitle?: string | null;

    @Expose()
    @IsOptional()
    @IsIn(TitleValues)
    title?: Title | null;

    @Expose()
    @IsOptional()
    @IsDate()
    date?: Date | null;
}