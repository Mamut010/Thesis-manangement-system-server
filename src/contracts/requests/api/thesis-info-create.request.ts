import { Expose, Type } from "class-transformer";
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class ThesisInfoCreateRequest {
    @Expose()
    @IsOptional()
    @IsNumber()
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
    @IsOptional()
    @IsString()
    title?: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    slot: number = 0;

    @Expose()
    @IsOptional()
    @IsNumber()
    slotLimit?: number;

    @Expose()
    @IsOptional()
    @IsBoolean()
    activateRegistration: boolean = false;

    @Expose()
    @IsOptional()
    @IsBoolean()
    activateDefense: boolean = false;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    submissionDeadline?: Date;

    @Expose()
    @IsOptional()
    @IsNumber()
    numberHardCopies?: number;

    @Expose()
    @IsOptional()
    @IsString()
    printRequirements?: string;
}