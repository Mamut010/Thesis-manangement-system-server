import { Expose } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class TopicUpdateRequest {
    @Expose()
    @IsOptional()
    @IsString()
    title?: string;

    @Expose()
    @IsOptional()
    @IsString()
    description?: string;
}