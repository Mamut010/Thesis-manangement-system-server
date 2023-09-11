import { Expose } from "class-transformer";
import { IsDate, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class User {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsDefined()
    @IsString()
    userId!: string;

    @Expose()
    @IsDefined()
    @IsNumber()
    roleId!: number;

    @Expose()
    @IsDefined()
    @IsString()
    username!: string;

    @Expose()
    @IsDefined()
    @IsString()
    password!: string;

    @Expose()
    @IsDefined()
    @IsString()
    email!: string;

    @Expose()
    @IsOptional()
    @IsDate()
    lastActivityDate!: Date | null;

    @Expose()
    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @Expose()
    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}