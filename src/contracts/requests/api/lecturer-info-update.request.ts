import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class LecturerInfoUpdateRequest {
    @Expose()
    @IsOptional()
    @IsString()
    email?: string;

    @Expose()
    @IsOptional()
    @IsString()
    title?: string;

    @Expose()
    @IsOptional()
    @IsString()
    bio?: string;

    @Expose()
    @IsOptional()
    @IsString()
    type?: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    numberOfTheses?: number;
}