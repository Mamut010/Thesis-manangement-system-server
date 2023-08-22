import { Expose } from "class-transformer";
import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class LecturerUpdateRequest {
    @Expose()
    @IsOptional()
    @IsString()
    title?: string;

    @Expose()
    @IsOptional()
    @IsString()
    bio?: string;

    @Expose()
    @IsOptional()
    @IsString()
    type?: string;

    @Expose()
    @IsOptional()
    @IsEmail()
    email?: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    numberOfTheses?: number;

    @Expose()
    @IsOptional()
    @IsString()
    signature?: string;
}