import { Expose, Type } from "class-transformer";
import { IsBoolean, IsDate, IsOptional, IsString } from "class-validator";

export class OralDefenseRegistrationUpdateRequest {
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
    @IsBoolean()
    concernedAgreed?: boolean;

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

    @Expose()
    @IsOptional()
    @IsBoolean()
    studentConfirmed?: boolean;

    @Expose()
    @IsOptional()
    @IsBoolean()
    adminConfirmed?: boolean;
}