import { Expose, Type } from "class-transformer";
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class OralDefenseRegistrationUpdateRequest {
    @Expose()
    @IsOptional()
    @IsNumber()
    thesisId?: number;

    @Expose()
    @IsOptional()
    @IsString()
    studentId?: string;

    @Expose()
    @IsOptional()
    @IsString()
    supervisor1Id?: string;

    @Expose()
    @IsOptional()
    @IsString()
    supervisor2Id?: string;

    @Expose()
    @IsOptional()
    @IsString()
    room?: string;

    @Expose()
    @IsOptional()
    @IsBoolean()
    areSpectatorsAllowed?: boolean;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    proposedDate?: Date;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    actualDate?: Date;

    @Expose()
    @IsOptional()
    @IsNumber()
    concernedAgreed?: number;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    dateReceived?: Date;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    admissionDate?: Date;
}