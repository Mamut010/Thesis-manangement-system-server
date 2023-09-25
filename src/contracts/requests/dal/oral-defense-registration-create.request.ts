import { Expose, Type } from "class-transformer";
import { IsBoolean, IsDate, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class OralDefenseRegistrationCreateRequest {
    @Expose()
    @IsDefined()
    @IsString()
    studentId!: string;

    @Expose()
    @IsDefined()
    @IsNumber()
    attemptNo!: number;

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