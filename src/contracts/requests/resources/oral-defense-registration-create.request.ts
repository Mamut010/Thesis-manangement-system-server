import { Expose, Type } from "class-transformer";
import { IsDate, IsDefined, IsIn, IsNumber, IsOptional, IsString } from "class-validator";
import { WeekdayValues } from "../../constants/weekdays";

export class OralDefenseRegistrationCreateRequest {
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
    @IsString()
    room?: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    spectatorsPresent?: number;

    @Expose()
    @IsOptional()
    @IsString()
    @IsIn(WeekdayValues)
    weekday?: string;

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
    @IsNumber()
    concernedAgreed?: number;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    receivingDate?: Date;

    @Expose()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    submissionDate?: Date;
}