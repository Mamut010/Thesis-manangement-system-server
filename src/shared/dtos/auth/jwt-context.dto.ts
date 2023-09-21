import { Expose } from "class-transformer";
import { ArrayMinSize, IsDefined, IsIn, IsNumber, IsString } from "class-validator"
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
    @ArrayMinSize(1)
    @IsIn(Roles, { each: true })
    roles!: Role[];
}