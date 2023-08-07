import { Expose } from "class-transformer";
import { IsBoolean, IsDate, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class OralDefenseRegistrationDto {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsDefined()
    @IsNumber()
    studentId!: number;

    @Expose()
    @IsOptional()
    @IsString()
    surname!: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    forename!: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    supervisor1Title!: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    supervisor2Title!: string | null;

    @Expose()
    @IsOptional()
    @IsBoolean()
    areSpectatorsAllowed!: boolean | null;

    @Expose()
    @IsOptional()
    @IsString()
    weekdate!: string | null;

    @Expose()
    @IsOptional()
    @IsDate()
    proposedDate!: Date | null;

    @Expose()
    @IsOptional()
    @IsDate()
    actualDate!: Date | null;

    @Expose()
    @IsOptional()
    @IsString()
    room!: string | null;

    @Expose()
    @IsOptional()
    @IsNumber()
    concernedAgreed!: number | null;

    @Expose()
    @IsOptional()
    @IsDate()
    receivingDate!: Date | null;

    @Expose()
    @IsOptional()
    @IsDate()
    submissionDate!: Date | null;
}