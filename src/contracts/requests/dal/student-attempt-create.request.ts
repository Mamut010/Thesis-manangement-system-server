import { Expose } from "class-transformer";
import { IsDefined, IsNumber, IsString } from "class-validator";

export class StudentAttemptCreateRequest {
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
    @IsDefined()
    @IsString()
    supervisor2Id!: string;
}