import { Expose } from "class-transformer";
import { IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class Student {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsDefined()
    @IsString()
    userId!: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    programId!: number | null;

    @Expose()
    @IsOptional()
    @IsString()
    surname!: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    forename!: string | null;

    @Expose()
    @IsOptional()
    @IsNumber()
    intake!: number | null;

    @Expose()
    @IsDefined()
    @IsNumber()
    ects!: number;

    @Expose()
    @IsOptional()
    @IsString()
    signature!: string | null;
}