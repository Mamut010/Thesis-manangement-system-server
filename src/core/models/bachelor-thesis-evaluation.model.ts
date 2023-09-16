import { Expose } from "class-transformer";
import { IsDate, IsDefined, IsIn, IsNumber, IsOptional, IsString } from "class-validator";
import { TitleValues } from "../../contracts/constants/title";

export class BachelorThesisEvaluation {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsDefined()
    @IsString()
    studentAttemptId!: string;

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
    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @Expose()
    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}