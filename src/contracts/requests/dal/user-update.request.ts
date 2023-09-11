import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { Expose } from "class-transformer";

export class UserUpdateRequest {
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
    @IsString()
    email?: string;

    @Expose()
    @IsOptional()
    @IsDate()
    lastActivityDate?: Date;
}