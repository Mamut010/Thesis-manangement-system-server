import { Expose } from "class-transformer";
import { IsBoolean, IsDate, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class OralDefenseRegistration {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsDefined()
    @IsNumber()
    thesisId!: number;

    @Expose()
    @IsDefined()
    @IsNumber()
    studentId!: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    supervisor1Id!: number | null;

    @Expose()
    @IsOptional()
    @IsNumber()
    supervisor2Id!: number | null;

    @Expose()
    @IsOptional()
    @IsString()
    room!: string | null;

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

    @Expose()
    @IsOptional()
    @IsNumber()
    step!: number | null;

    @Expose()
    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @Expose()
    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}