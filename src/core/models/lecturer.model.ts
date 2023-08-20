import { Expose } from "class-transformer";
import { IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class Lecturer {
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
    title!: string | null;

    @Expose()
    @IsDefined()
    @IsString()
    numberOfTheses!: number;

    @Expose()
    @IsOptional()
    @IsString()
    bio!: string | null;
}