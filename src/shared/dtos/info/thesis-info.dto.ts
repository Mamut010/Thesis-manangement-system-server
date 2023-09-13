import { Expose } from "class-transformer";
import { IsBoolean, IsDate, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class ThesisInfoDto {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsOptional()
    @IsString()
    title!: string | null;

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
    @IsBoolean()
    activateRegistration!: boolean;

    @Expose()
    @IsDefined()
    @IsBoolean()
    activateDefense!: boolean;

    @Expose()
    @IsOptional()
    @IsDate()
    submissionDeadline!: Date | null;

    @Expose()
    @IsOptional()
    @IsNumber()
    numberHardCopies!: number | null;

    @Expose()
    @IsOptional()
    @IsString()
    printRequirements!: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    templateFiles!: string | null;
}