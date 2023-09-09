import { IsDate, IsDefined, IsOptional, IsString } from "class-validator";
import { Expose, } from "class-transformer";

export class UserCreateRequest {
    @Expose()
    @IsDefined()
    @IsString()
    userId!: string;

    @Expose()
    @IsDefined()
    @IsString()
    username!: string;

    @Expose()
    @IsDefined()
    @IsString()
    password!: string;

    @Expose()
    @IsDefined()
    @IsString()
    roleName!: string;

    @Expose()
    @IsOptional()
    @IsString()
    email?: string;

    @Expose()
    @IsOptional()
    @IsDate()
    lastActivityDate?: Date;
}