import { Expose } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class RoleUpdateRequest {
    @Expose()
    @IsOptional()
    @IsString()
    description?: string;
}