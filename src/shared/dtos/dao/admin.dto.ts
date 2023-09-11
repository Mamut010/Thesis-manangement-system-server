import { Expose } from "class-transformer";
import { IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class AdminDto {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsDefined()
    @IsString()
    adminId!: string;

    @Expose()
    @IsOptional()
    @IsString()
    title?: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    contact?: string | null;

    @Expose()
    @IsDefined()
    @IsString()
    email!: string;

    @Expose()
    @IsOptional()
    @IsString()
    signature?: string | null;
}