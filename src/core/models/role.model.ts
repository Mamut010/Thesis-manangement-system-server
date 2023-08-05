import { IsDefined, IsIn, IsNumber, IsString } from "class-validator";
import { RoleValues } from "../constants/roles";
import { Expose } from "class-transformer";

export class Role {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsDefined()
    @IsString()
    @IsIn(RoleValues)
    name!: string;
}