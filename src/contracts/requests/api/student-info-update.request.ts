import { Expose } from "class-transformer";
import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class StudentInfoUpdateRequest {
    @Expose()
    @IsOptional()
    @IsNumber()
    programId?: number;

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
    @IsNumber()
    intake?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    ects?: number;
}