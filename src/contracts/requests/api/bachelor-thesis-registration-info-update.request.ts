import { Expose, Type } from "class-transformer";
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class BachelorThesisRegistrationInfoUpdateRequest {
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
    @IsDate()
    @Type(() => Date)
    dateOfBirth?: Date;

    @Expose()
    @IsOptional()
    @IsString()
    placeOfBirth?: string;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    studentDate?: Date;

    @Expose()
    @IsOptional()
    @IsString()
    furtherParticipants?: string;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    supervisor1Date?: Date;

    @Expose()
    @IsOptional()
    @IsBoolean()
    supervisor1Confirmed?: boolean;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    supervisor2Date?: Date;

    @Expose()
    @IsOptional()
    @IsBoolean()
    supervisor2Confirmed?: boolean;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    issued?: Date;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    deadlineCopy?: Date;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    extensionGranted?: Date;

    @Expose()
    @IsOptional()
    @IsString()
    chairmanOfExamination?: string;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    dateOfIssue?: Date;
}