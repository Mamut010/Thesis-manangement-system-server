import { Expose } from "class-transformer";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class NotificationCreateRequest {
    @Expose()
    @IsOptional()
    @IsString()
    senderId?: string;

    @Expose()
    @IsOptional()
    @IsString({ each: true })
    receiverIds?: string[];

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