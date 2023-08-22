import { Expose } from "class-transformer";
import { IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class Admin {
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
    @IsOptional()
    @IsString()
    contact!: string | null;
}