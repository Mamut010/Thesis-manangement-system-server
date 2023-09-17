import { Expose } from "class-transformer";
import { IsBoolean, IsDate, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class OralDefenseRegistration {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsDefined()
    @IsString()
    studentAttemptId!: string;

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
    @IsBoolean()
    concernedAgreed!: boolean | null;

    @Expose()
    @IsOptional()
    @IsDate()
    dateReceived!: Date | null;

    @Expose()
    @IsOptional()
    @IsDate()
    admissionDate!: Date | null;

    @Expose()
    @IsDefined()
    @IsBoolean()
    studentConfirmed!: boolean;

    @Expose()
    @IsDefined()
    @IsBoolean()
    adminConfirmed!: boolean;

    @Expose()
    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @Expose()
    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}