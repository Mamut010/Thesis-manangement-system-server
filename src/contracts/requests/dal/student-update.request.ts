import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class StudentUpdateRequest {
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
    @IsString()
    email?: string;

    @Expose()
    @IsOptional()
    @IsString()
    signature?: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    intake?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    ects?: number;
}