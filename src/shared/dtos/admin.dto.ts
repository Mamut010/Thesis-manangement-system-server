import { Expose } from "class-transformer";
import { IsDefined, IsEmail, IsOptional, IsString } from "class-validator";

export class AdminDto {
    @Expose()
    @IsDefined()
    @IsString()
    adminId!: string;

    @Expose()
    @IsOptional()
    @IsString()
    title!: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    contact!: string | null;

    @Expose()
    @IsOptional()
    @IsEmail()
    email!: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    signature!: string | null;
}