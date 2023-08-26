import { Expose } from "class-transformer";
import { IsDefined, IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class LecturerInfoDto {
    @Expose()
    @IsDefined()
    @IsString()
    lecturerId!: string;

    @Expose()
    @IsOptional()
    @IsString()
    title!: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    bio!: string | null;

    @Expose()
    @IsDefined()
    @IsString()
    type!: string;

    @Expose()
    @IsOptional()
    @IsEmail()
    email!: string | null;

    @Expose()
    @IsDefined()
    @IsNumber()
    numberOfTheses!: number;
}