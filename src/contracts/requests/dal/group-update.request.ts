import { Expose } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class GroupUpdateRequest {
    @Expose()
    @IsOptional()
    @IsString()
    processId?: string;

    @Expose()
    @IsOptional()
    @IsString()
    name?: string;

    @Expose()
    @IsOptional()
    @IsString()
    description?: string;
}