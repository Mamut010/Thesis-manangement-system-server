import { Expose } from "class-transformer";
import { IsDefined, IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class AdminInfoDto {
    @Expose()
    @IsDefined()
    @IsNumber()
    adminId!: number;

    @Expose()
    @IsOptional()
    @IsString()
    signature!: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    contact!: string | null;

    @Expose()
    @IsOptional()
    @IsEmail()
    email!: string | null;
}