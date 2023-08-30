import { IsDate, IsDefined, IsIn, IsNumber, IsOptional, IsString } from "class-validator";
import { Roles } from "../constants/roles";
import { Expose } from "class-transformer";

export class Role {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsDefined()
    @IsString()
    @IsIn(Roles)
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