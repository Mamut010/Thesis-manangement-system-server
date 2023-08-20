import { IsDefined, IsEmail, IsOptional, IsString, ValidateNested } from "class-validator";
import { Role } from "../../core/models";
import { Expose, Type } from "class-transformer";

export class UserCreateRequestDto {
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
    @ValidateNested()
    @Type(() => Role)
    role!: Role;

    @Expose()
    @IsOptional()
    @IsEmail()
    email?: string;
}