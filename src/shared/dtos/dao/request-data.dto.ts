import { Expose } from "class-transformer";
import { IsDefined, IsString } from "class-validator";

export class RequestDataDto {
    @Expose()
    @IsDefined()
    @IsString()
    requestId!: string;

    @Expose()
    @IsDefined()
    @IsString()
    name!: string;

    @Expose()
    @IsDefined()
    @IsString()
    value!: string;
}