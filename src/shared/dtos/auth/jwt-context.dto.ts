import { Expose, Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsDefined, IsIn, IsNumber, IsString } from "class-validator"
import { Role } from "../../../core/constants/roles";

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
    @IsIn(Object.values(Role), { each: true })
    @Type(() => String)
    roles!: string[];
}