import { Expose } from "class-transformer";
import { IsDate, IsDefined, IsIn, IsNumber, IsOptional, IsString } from "class-validator";
import { Role, Roles } from "../../../core/constants/roles";

export class UserDto {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsDefined()
    @IsString()
    userId!: string;

    @Expose()
    @IsDefined()
    @IsNumber()
    roleId!: number;

    @Expose()
    @IsDefined()
    @IsIn(Roles)
    roleName!: Role;

    @Expose()
    @IsDefined()
    @IsString()
    username!: string;

    @Expose()
    @IsDefined()
    @IsString()
    password!: string;

    @Expose()
    @IsDefined()
    @IsString()
    email!: string;

    @Expose()
    @IsOptional()
    @IsDate()
    lastActivityDate?: Date | null;
}