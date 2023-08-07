import { Expose } from "class-transformer";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class OralDefenseRegistrationUpdateRequest {
    @Expose()
    @IsOptional()
    @IsNumber()
    thesisId?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    studentId?: number;

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
    @IsString()
    room?: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    spectatorsPresent?: number;

    @Expose()
    @IsOptional()
    @IsString()
    weekdate?: string;

    @Expose()
    @IsOptional()
    @IsDate()
    proposedDate?: Date;

    @Expose()
    @IsOptional()
    @IsDate()
    actualDate?: Date;

    @Expose()
    @IsOptional()
    @IsNumber()
    concernedAgreed?: number;

    @Expose()
    @IsOptional()
    @IsDate()
    receivingDate?: Date;

    @Expose()
    @IsOptional()
    @IsDate()
    submissionDate?: Date;
}