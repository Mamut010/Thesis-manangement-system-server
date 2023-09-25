import { Expose } from "class-transformer";
import { IsBoolean, IsDate, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class BachelorThesisRegistration {
    @Expose()
    @IsDefined()
    @IsNumber()
    id!: number;

    @Expose()
    @IsDefined()
    @IsString()
    studentAttemptId!: string;

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
    @IsDate()
    studentDate!: Date | null;

    @Expose()
    @IsOptional()
    @IsString()
    furtherParticipants!: string | null;

    @Expose()
    @IsOptional()
    @IsDate()
    supervisor1Date!: Date | null;

    @Expose()
    @IsOptional()
    @IsDate()
    supervisor2Date!: Date | null;

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

    @Expose()
    @IsDefined()
    @IsBoolean()
    studentConfirmed!: boolean;

    @Expose()
    @IsDefined()
    @IsBoolean()
    adminConfirmed!: boolean;

    @Expose()
    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @Expose()
    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}