import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsDefined, IsEmail, IsIn, IsNumber, IsOptional, IsString } from "class-validator";
import { Roles } from "../../core/enums/roles";

export class SignUpRequest {
    /**
     * User ID
     */
    @IsDefined()
    @IsNumber()
    id!: number;

    @IsDefined()
    @IsString()
    username!: string;

    @IsDefined()
    @IsString()
    password!: string;

    @IsDefined()
    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(1)
    @IsIn(Object.values(Roles), { each: true })
    @Type(() => String)
    roles!: string[]

    @IsOptional()
    @IsEmail()
    email?: string
}