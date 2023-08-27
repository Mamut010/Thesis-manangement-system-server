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
    @IsString()
    studentId!: string;

    @Expose()
    @IsOptional()
    @IsString()
    supervisor1Id!: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    supervisor2Id!: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    adminId!: string | null;

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
    dateReceived!: Date | null;

    @Expose()
    @IsOptional()
    @IsDate()
    admissionDate!: Date | null;

    @Expose()
    @IsOptional()
    @IsBoolean()
    adminAllowed!: boolean | null;

    @Expose()
    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @Expose()
    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}