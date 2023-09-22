import { Expose } from "class-transformer";
import { IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class ThesisInfoCreateRequest {
    @Expose()
    @IsOptional()
    @IsString()
    creatorId?: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    topicId?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    fieldId?: number;

    @Expose()
    @IsDefined()
    @IsString()
    title!: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    slot?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    slotLimit?: number;
}