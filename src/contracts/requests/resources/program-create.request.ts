import { Expose } from "class-transformer";
import { IsDefined, IsOptional, IsString } from "class-validator";

export class ProgramCreateRequest {
    @Expose()
    @IsDefined()
    @IsString()
    title!: string;

    @Expose()
    @IsOptional()
    @IsString()
    description?: string;
}