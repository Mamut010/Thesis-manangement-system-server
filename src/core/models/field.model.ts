import { IsDefined, IsNumber, IsOptional, IsString } from "class-validator";
import { Expose } from "class-transformer";

export class Field {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsDefined()
    @IsString()
    title!: string;

    @Expose()
    @IsOptional()
    @IsString()
    description!: string | null;
}