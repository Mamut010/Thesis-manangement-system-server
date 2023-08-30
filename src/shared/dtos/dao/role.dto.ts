import { Expose } from "class-transformer";
import { IsDefined, IsIn, IsNumber, IsOptional, IsString } from "class-validator";
import { Roles } from "../../../core/constants/roles";

export class RoleDto {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsDefined()
    @IsString()
    @IsIn(Roles)
    name!: string;

    @Expose()
    @IsOptional()
    @IsString()
    description?: string | null;
}