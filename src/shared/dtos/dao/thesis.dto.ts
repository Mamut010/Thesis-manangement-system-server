import { Expose } from "class-transformer";
import { IsDate, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class ThesisDto {
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

    @Expose()
    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @Expose()
    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}