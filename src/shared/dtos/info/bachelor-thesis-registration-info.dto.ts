import { Expose } from "class-transformer";
import { IsDate, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class BachelorThesisRegistrationInfoDto {
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
    @IsDate()
    dateOfBirth?: Date | null;

    @Expose()
    @IsOptional()
    @IsString()
    placeOfBirth?: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    thesisTitle?: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    furtherParticipants?: string | null;

    @Expose()
    @IsOptional()
    @IsDate()
    studentDate?: Date | null;

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
    @IsDate()
    supervisor1Date?: Date | null;

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
    @IsDate()
    supervisor2Date?: Date | null;

    @Expose()
    @IsOptional()
    @IsDate()
    issued?: Date | null;

    @Expose()
    @IsOptional()
    @IsDate()
    deadlineCopy?: Date | null;

    @Expose()
    @IsOptional()
    @IsDate()
    extensionGranted?: Date | null;

    @Expose()
    @IsOptional()
    @IsString()
    chairmanOfExamination?: string | null;

    @Expose()
    @IsOptional()
    @IsDate()
    dateOfIssue?: Date | null;

    @Expose()
    @IsDefined()
    @IsString({ each: true })
    updatableFields: string[] = [];
}