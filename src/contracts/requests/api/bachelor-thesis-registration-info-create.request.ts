import { Expose, Type } from "class-transformer";
import { IsDate, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class BachelorThesisRegistrationInfoCreateRequest {
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
    @IsDate()
    @Type(() => Date)
    supervisor2Date?: Date;

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