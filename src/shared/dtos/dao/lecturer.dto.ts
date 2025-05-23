import { Expose } from "class-transformer";
import { IsDefined, IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class LecturerDto {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsDefined()
    @IsString()
    lecturerId!: string;

    @Expose()
    @IsOptional()
    @IsString()
    title?: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    bio?: string | null;

    @Expose()
    @IsDefined()
    @IsString()
    type!: string;

    @Expose()
    @IsDefined()
    @IsString()
    email!: string;

    @Expose()
    @IsDefined()
    @IsNumber()
    numberOfTheses!: number;

    @Expose()
    @IsOptional()
    @IsString()
    signature?: string | null;
}