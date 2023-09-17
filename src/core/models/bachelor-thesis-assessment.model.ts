import { Expose } from "class-transformer";
import { IsBoolean, IsDate, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class BachelorThesisAssessment {
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
    @IsString()
    furtherParticipants!: string | null;

    @Expose()
    @IsOptional()
    @IsNumber()
    supervisor1Grade!: number | null;

    @Expose()
    @IsOptional()
    @IsNumber()
    supervisor2Grade!: number | null;

    @Expose()
    @IsOptional()
    @IsString()
    assessmentDescription!: string | null;

    @Expose()
    @IsOptional()
    @IsDate()
    assessmentDate!: Date | null;

    @Expose()
    @IsDefined()
    @IsBoolean()
    supervisor1Confirmed!: boolean;

    @Expose()
    @IsDefined()
    @IsBoolean()
    supervisor2Confirmed!: boolean;

    @Expose()
    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @Expose()
    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}