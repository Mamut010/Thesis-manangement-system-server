import { Expose } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class GroupInfoUpdateRequest {
    @Expose()
    @IsOptional()
    @IsString()
    name?: string;

    @Expose()
    @IsOptional()
    @IsString()
    description?: string;
}