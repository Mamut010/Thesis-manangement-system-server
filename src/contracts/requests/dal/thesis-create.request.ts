import { Expose, Type } from "class-transformer";
import { IsBoolean, IsDate, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class ThesisCreateRequest {
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
    creatorId!: string;

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

    @Expose()
    @IsOptional()
    @IsBoolean()
    activateRegistration?: boolean;

    @Expose()
    @IsOptional()
    @IsBoolean()
    activateDefense?: boolean;

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