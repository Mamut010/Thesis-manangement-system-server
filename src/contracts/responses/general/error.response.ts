import { Expose } from "class-transformer";
import { IsDefined, IsNumber, IsPositive, IsString } from "class-validator";

export class ErrorResponse {
    @Expose()
    @IsDefined()
    @IsNumber()
    @IsPositive()
    status!: number;

    @Expose()
    @IsDefined()
    @IsString()
    message!: string;
}