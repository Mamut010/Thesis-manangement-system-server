import { IsDefined, IsIn, IsNumber, IsString } from "class-validator";
import { ROLES } from "../constants/roles";
import { Expose } from "class-transformer";
import * as type from './../../shared/types/roles';

export class Role {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsDefined()
    @IsString()
    @IsIn(Object.values(ROLES))
    name!: type.Role;
}