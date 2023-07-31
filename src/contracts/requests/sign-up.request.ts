import { Expose, Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsDefined, IsEmail, IsIn, IsNumber, IsOptional, IsString } from "class-validator";
import { Roles } from "../../core/enums/roles";

export class SignUpRequest {
    /**
     * User ID
     */
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

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
    @IsIn(Object.values(Roles), { each: true })
    @Type(() => String)
    roles!: string[]

    @Expose()
    @IsOptional()
    @IsEmail()
    email?: string
}