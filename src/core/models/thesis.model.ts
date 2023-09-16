import { Expose } from "class-transformer";
import { IsBoolean, IsDate, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

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
    @IsOptional()
    @IsString()
    title!: string | null;

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

    @Expose()
    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @Expose()
    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}