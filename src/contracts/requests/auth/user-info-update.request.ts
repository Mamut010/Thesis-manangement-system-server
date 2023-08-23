import { Expose } from "class-transformer";
import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class UserInfoUpdateRequest {
    @Expose()
    @IsOptional()
    @IsString()
    userId?: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    roleId?: number;

    @Expose()
    @IsOptional()
    @IsString()
    username?: string;

    @Expose()
    @IsOptional()
    @IsString()
    password?: string;

    @Expose()
    @IsOptional()
    @IsEmail()
    email?: string;
}