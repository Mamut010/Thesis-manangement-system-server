import { Expose } from "class-transformer";
import { IsDefined, IsIn, IsNumber, IsOptional, IsString } from "class-validator";
import { RoleValues } from "../../../core/constants/roles";

export class RoleDto {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsDefined()
    @IsString()
    @IsIn(RoleValues)
    name!: string;

    @Expose()
    @IsOptional()
    @IsString()
    description!: string | null;
}