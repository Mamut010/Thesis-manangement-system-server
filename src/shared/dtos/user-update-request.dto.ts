import { IsDefined, IsEmail, IsNumber, IsOptional, IsString } from "class-validator";
import { Expose } from "class-transformer";

export class UserUpdateRequestDto {
    @Expose()
    @IsDefined()
    @IsString()
    userId!: string;

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