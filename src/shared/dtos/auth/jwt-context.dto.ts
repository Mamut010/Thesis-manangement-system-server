import { Expose, Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsDefined, IsIn, IsNumber, IsString } from "class-validator"
import { Role, Roles } from "../../../core/constants/roles";

export class JwtAccessContextDto {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsDefined()
    @IsString()
    userId!: string;

    // "each" tells class-validator to run the validation on each item of the array
    @Expose()
    @IsDefined()
    @IsString({ each: true })
    @ArrayMinSize(1)
    @ArrayMaxSize(1)
    @IsIn(Roles, { each: true })
    @Type(() => String)
    roles!: string[];
}