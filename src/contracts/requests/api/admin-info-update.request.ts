import { Expose } from "class-transformer";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class AdminInfoUpdateRequest {
    @Expose()
    @IsOptional()
    @IsString()
    title?: string;

    @Expose()
    @IsOptional()
    @IsString()
    contact?: string;

    @Expose()
    @IsOptional()
    @IsEmail()
    email?: string;
}