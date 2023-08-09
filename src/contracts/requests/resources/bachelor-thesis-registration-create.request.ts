import { Expose, Type } from "class-transformer";
import { IsBoolean, IsDate, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class BachelorThesisRegistrationCreateRequest {
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
    supervisor1Id?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    supervisor2Id?: number;
    
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