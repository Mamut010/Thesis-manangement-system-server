import { IsDate, IsDefined, IsIn, IsNumber, IsOptional, IsString } from "class-validator";
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

    @Expose()
    @IsOptional()
    @IsString()
    description!: string | null;

    @Expose()
    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @Expose()
    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}