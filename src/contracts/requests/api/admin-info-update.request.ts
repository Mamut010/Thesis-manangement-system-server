import { Expose } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class AdminInfoUpdateRequest {
    @Expose()
    @IsOptional()
    @IsString()
    title?: string;

    @Expose()
    @IsOptional()
    @IsString()
    contact?: string;
}