import { Expose } from "class-transformer";
import { IsDefined, IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class LecturerInfoDto {
    @Expose()
    @IsDefined()
    @IsNumber()
    lecturerId!: number;

    @Expose()
    @IsOptional()
    @IsString()
    title!: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    bio!: string | null;

    @Expose()
    @IsOptional()
    @IsEmail()
    email!: string | null;

    @Expose()
    @IsDefined()
    @IsNumber()
    numberOfTheses!: number;

    @Expose()
    @IsOptional()
    @IsString()
    signature!: string | null;
}