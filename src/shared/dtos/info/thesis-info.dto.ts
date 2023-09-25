import { Expose } from "class-transformer";
import { IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class ThesisInfoDto {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsDefined()
    @IsString()
    title!: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    topicId!: number | null;

    @Expose()
    @IsOptional()
    @IsString()
    topicTitle!: string | null;

    @Expose()
    @IsOptional()
    @IsNumber()
    fieldId!: number | null;

    @Expose()
    @IsOptional()
    @IsString()
    fieldTitle!: string | null;

    @Expose()
    @IsDefined()
    @IsString()
    creatorId!: string;

    @Expose()
    @IsOptional()
    @IsString()
    creatorTitle!: string | null;

    @Expose()
    @IsDefined()
    @IsNumber()
    slot!: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    slotLimit!: number | null;
}