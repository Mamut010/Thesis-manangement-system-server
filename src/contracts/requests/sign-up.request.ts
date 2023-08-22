import { Expose } from "class-transformer";
import { IsDefined, IsEmail, IsIn, IsOptional, IsString } from "class-validator";
import { RoleValues } from "../../core/constants/roles";

export class SignUpRequest {
    @Expose()
    @IsDefined()
    @IsString()
    userId!: string;

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
    @IsIn(RoleValues)
    role!: string

    @Expose()
    @IsOptional()
    @IsEmail()
    email?: string
}