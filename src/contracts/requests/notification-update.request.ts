import { Expose } from "class-transformer";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class NotificationUpdateRequest {
    @Expose()
    @IsOptional()
    @IsString()
    title?: string;

    @Expose()
    @IsOptional()
    @IsString()
    content?: string;

    @Expose()
    @IsOptional()
    @IsBoolean()
    isRead?: boolean;
}