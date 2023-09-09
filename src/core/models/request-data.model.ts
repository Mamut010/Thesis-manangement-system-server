import { Expose } from "class-transformer";
import { IsDate, IsDefined, IsString } from "class-validator";

export class RequestData {
    @Expose()
    @IsDefined()
    @IsString()
    id!: string;

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

    @Expose()
    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @Expose()
    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}