import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class ThesisUpdateRequest {
    @Expose()
    @IsOptional()
    @IsNumber()
    topicId?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    fieldId?: number;

    @Expose()
    @IsOptional()
    @IsString()
    creatorId?: string;

    @Expose()
    @IsOptional()
    @IsString()
    title?: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    slot?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    slotLimit?: number;
}