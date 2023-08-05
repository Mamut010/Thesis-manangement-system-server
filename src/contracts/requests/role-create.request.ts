import { Expose } from "class-transformer";
import { IsDefined, IsOptional, IsString } from "class-validator";

export class RoleCreateRequest {
    @Expose()
    @IsDefined()
    @IsString()
    name!: string;

    @Expose()
    @IsOptional()
    @IsString()
    description?: string;
}