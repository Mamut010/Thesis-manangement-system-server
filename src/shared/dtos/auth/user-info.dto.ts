import { Expose } from "class-transformer";
import { IsDate, IsDefined, IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class UserInfoDto {
    @Expose()
    @IsDefined()
    @IsString()
    userId!: string;

    @Expose()
    @IsDefined()
    @IsNumber()
    roleId!: number;

    @Expose()
    @IsDefined()
    @IsString()
    roleName!: string;

    @Expose()
    @IsDefined()
    @IsString()
    username!: string;

    @Expose()
    @IsOptional()
    @IsEmail()
    email!: string | null;

    @Expose()
    @IsOptional()
    @IsDate()
    lastActivityDate!: Date | null;
}