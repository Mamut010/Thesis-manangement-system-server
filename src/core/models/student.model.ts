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
    @IsString()
    intake!: string | null;

    @Expose()
    @IsDefined()
    @IsNumber()
    ects!: number;

    @Expose()
    @IsOptional()
    @IsString()
    signature!: string | null;
}