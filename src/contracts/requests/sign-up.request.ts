import { Expose, Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsDefined, IsEmail, IsIn, IsOptional, IsString } from "class-validator";
import { ROLES } from "../../core/constants/roles";

export class SignUpRequest {
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
    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(1)
    @IsIn(Object.values(ROLES), { each: true })
    @Type(() => String)
    roles!: string[]

    @Expose()
    @IsOptional()
    @IsEmail()
    email?: string
}