import { Expose, Type } from "class-transformer";
import { IsBoolean, IsDate, IsOptional, IsString } from "class-validator";

export class BachelorThesisRegistrationUpdateRequest {
    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    dateOfBirth?: Date | null;

    @Expose()
    @IsOptional()
    @IsString()
    placeOfBirth?: string | null;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    studentDate?: Date | null;

    @Expose()
    @IsOptional()
    @IsString()
    furtherParticipants?: string | null;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    supervisor1Date?: Date | null;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    supervisor2Date?: Date | null;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    issued?: Date | null;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    deadlineCopy?: Date | null;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    extensionGranted?: Date | null;

    @Expose()
    @IsOptional()
    @IsString()
    chairmanOfExamination?: string | null;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    dateOfIssue?: Date | null;

    @Expose()
    @IsOptional()
    @IsBoolean()
    studentConfirmed?: boolean;

    @Expose()
    @IsOptional()
    @IsBoolean()
    adminConfirmed?: boolean;
}