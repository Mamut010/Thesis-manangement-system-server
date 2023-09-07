import { Expose } from "class-transformer";
import { IsDefined, IsOptional, IsString } from "class-validator";

export class Process {
    @Expose()
    @IsDefined()
    @IsString()
    id!: string;

    @Expose()
    @IsDefined()
    @IsString()
    name!: string;

    @Expose()
    @IsOptional()
    @IsString()
    description!: string | null;
}