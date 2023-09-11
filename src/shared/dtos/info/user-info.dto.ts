import { Expose } from "class-transformer";
import { IsDate, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

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
    @IsDefined()
    @IsString()
    email!: string;

    @Expose()
    @IsOptional()
    @IsDate()
    lastActivityDate?: Date | null;
}