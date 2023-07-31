import { Expose, Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsDefined, IsEmail, IsIn, IsNumber, IsOptional, IsString } from "class-validator"
import { ROLES } from "../../core/constants/roles";

export class JwtAccessContextDto {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsDefined()
    @IsNumber()
    userId!: number;

    @Expose()
    @IsDefined()
    @IsString()
    username!: string;

    @Expose()
    @IsOptional()
    @IsEmail()
    email?: string;

    // "each" tells class-validator to run the validation on each item of the array
    @Expose()
    @IsDefined()
    @IsString({ each: true })
    @ArrayMinSize(1)
    @ArrayMaxSize(1)
    @IsIn(Object.values(ROLES), { each: true })
    @Type(() => String)
    roles!: string[];
}