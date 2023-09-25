import { Expose } from "class-transformer";
import { IsBoolean, IsDate, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class OralDefenseRegistrationInfoDto {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsDefined()
    @IsString()
    studentId!: string;

    @Expose()
    @IsDefined()
    @IsNumber()
    attemptNo!: number;

    @Expose()
    @IsDefined()
    @IsNumber()
    thesisId!: number;

    @Expose()
    @IsOptional()
    @IsString()
    surname?: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    forename?: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    thesisTitle?: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    supervisor1Id?: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    supervisor1Title?: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    supervisor2Id?: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    supervisor2Title?: string | null;

    @Expose()
    @IsOptional()
    @IsBoolean()
    areSpectatorsAllowed?: boolean | null;

    @Expose()
    @IsOptional()
    @IsDate()
    proposedDate?: Date | null;

    @Expose()
    @IsOptional()
    @IsDate()
    actualDate?: Date | null;

    @Expose()
    @IsOptional()
    @IsString()
    room?: string | null;

    @Expose()
    @IsOptional()
    @IsBoolean()
    concernedAgreed?: boolean | null;

    @Expose()
    @IsOptional()
    @IsDate()
    dateReceived?: Date | null;

    @Expose()
    @IsOptional()
    @IsDate()
    admissionDate?: Date | null;

    @Expose()
    @IsDefined()
    @IsString({ each: true })
    updatableFields: string[] = [];
}