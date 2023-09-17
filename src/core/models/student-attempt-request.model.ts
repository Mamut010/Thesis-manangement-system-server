import { Expose } from "class-transformer";
import { IsDefined, IsString } from "class-validator";

export class StudentAttemptRequest {
    @Expose()
    @IsDefined()
    @IsString()
    id!: string;

    @Expose()
    @IsDefined()
    @IsString()
    studentAttemptId!: string;

    @Expose()
    @IsDefined()
    @IsString()
    requestId!: string;
}