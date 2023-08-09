import { Expose } from "class-transformer";
import { IsBoolean, IsDate, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class BachelorThesisRegistrationDto {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsDefined()
    @IsNumber()
    studentId!: number;

    @Expose()
    @IsOptional()
    @IsString()
    surname!: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    forename!: string | null;

    @Expose()
    @IsOptional()
    @IsDate()
    dateOfBirth!: Date | null;

    @Expose()
    @IsOptional()
    @IsString()
    placeOfBirth!: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    thesisTitle!: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    thesisType!: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    furtherParticipants!: string | null;

    @Expose()
    @IsOptional()
    @IsDate()
    studentDate!: Date | null;

    @Expose()
    @IsOptional()
    @IsNumber()
    supervisor1Id!: number | null;

    @Expose()
    @IsOptional()
    @IsString()
    supervisor1Title!: string | null;

    @Expose()
    @IsOptional()
    @IsDate()
    supervisor1Date!: Date | null;

    @Expose()
    @IsOptional()
    @IsNumber()
    supervisor2Id!: number | null;

    @Expose()
    @IsOptional()
    @IsBoolean()
    supervisor1Confirmed!: boolean | null;

    @Expose()
    @IsOptional()
    @IsString()
    supervisor2Title!: string | null;

    @Expose()
    @IsOptional()
    @IsDate()
    supervisor2Date!: Date | null;

    @Expose()
    @IsOptional()
    @IsBoolean()
    supervisor2Confirmed!: boolean | null;

    @Expose()
    @IsOptional()
    @IsBoolean()
    adminConfirmed!: boolean | null;

    @Expose()
    @IsOptional()
    @IsDate()
    issued!: Date | null;

    @Expose()
    @IsOptional()
    @IsDate()
    deadlineCopy!: Date | null;

    @Expose()
    @IsOptional()
    @IsDate()
    extensionGranted!: Date | null;

    @Expose()
    @IsOptional()
    @IsString()
    chairmanOfExamination!: string | null;

    @Expose()
    @IsOptional()
    @IsDate()
    dateOfIssue!: Date | null;
}