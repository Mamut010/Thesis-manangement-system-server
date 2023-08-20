import { Expose } from "class-transformer";
import { IsBoolean, IsDate, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class NotificationDto {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsOptional()
    @IsString()
    senderId!: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    title!: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    content!: string | null;

    @Expose()
    @IsDefined()
    @IsBoolean()
    isRead!: boolean;

    @Expose()
    @IsDefined()
    @IsDate()
    createdAt!: Date;
}