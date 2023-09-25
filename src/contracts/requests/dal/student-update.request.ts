import { Expose } from "class-transformer";
import { IsIn, IsNumber, IsOptional, IsString } from "class-validator";
import { Sex, Sexes } from "../../../core/constants/sex";

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
    @IsIn(Sexes)
    sex?: Sex;

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