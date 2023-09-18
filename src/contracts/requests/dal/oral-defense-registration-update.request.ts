import { Expose, Type } from "class-transformer";
import { IsBoolean, IsDate, IsOptional, IsString } from "class-validator";

export class OralDefenseRegistrationUpdateRequest {
    @Expose()
    @IsOptional()
    @IsString()
    room?: string | null;

    @Expose()
    @IsOptional()
    @IsBoolean()
    areSpectatorsAllowed?: boolean | null;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    proposedDate?: Date | null;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    actualDate?: Date | null;

    @Expose()
    @IsOptional()
    @IsBoolean()
    concernedAgreed?: boolean | null;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    dateReceived?: Date | null;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    admissionDate?: Date | null;

    @Expose()
    @IsOptional()
    @IsBoolean()
    studentConfirmed?: boolean;

    @Expose()
    @IsOptional()
    @IsBoolean()
    adminConfirmed?: boolean;
}