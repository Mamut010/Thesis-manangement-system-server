import { Expose } from "class-transformer";
import { IsDate, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class Thesis {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    topicId!: number | null;

    @Expose()
    @IsOptional()
    @IsNumber()
    fieldId!: number | null;

    @Expose()
    @IsDefined()
    @IsNumber()
    creatorId!: string;

    @Expose()
    @IsDefined()
    @IsString()
    title!: string;

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