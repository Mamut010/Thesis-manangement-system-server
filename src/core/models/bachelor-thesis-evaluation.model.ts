import { Expose } from "class-transformer";
import { IsBoolean, IsDate, IsDefined, IsIn, IsNumber, IsOptional, IsString } from "class-validator";
import { TitleValues } from "../../contracts/constants/title";

export class BachelorThesisEvaluation {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

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
    title!: string | null;

    @Expose()
    @IsOptional()
    @IsDate()
    date!: Date | null;

    @Expose()
    @IsOptional()
    @IsBoolean()
    supervisorConfirmed!: boolean | null;

    @Expose()
    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @Expose()
    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}