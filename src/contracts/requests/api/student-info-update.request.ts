import { Expose } from "class-transformer";
import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class StudentInfoUpdateRequest {
    @Expose()
    @IsOptional()
    @IsString()
    surname?: string;

    @Expose()
    @IsOptional()
    @IsString()
    forename?: string;

    @Expose()
    @IsOptional()
    @IsEmail()
    email?: string;

    @Expose()
    @IsOptional()
    @IsString()
    intake?: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    ects?: number;
}