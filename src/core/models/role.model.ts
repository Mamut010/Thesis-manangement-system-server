import { IsDefined, IsIn, IsNumber, IsString } from "class-validator";
import { Roles } from "../enums/roles";
import { Expose } from "class-transformer";

export class Role {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsDefined()
    @IsString()
    @IsIn(Object.values(Roles))
    name!: string;
}