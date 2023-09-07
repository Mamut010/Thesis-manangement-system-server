import { Expose } from "class-transformer";
import { IsDate, IsDefined, IsString } from "class-validator";

export class Request {
    @Expose()
    @IsDefined()
    @IsString()
    id!: string;

    @Expose()
    @IsDefined()
    @IsString()
    processId!: string;

    @Expose()
    @IsDefined()
    @IsString()
    userId!: string;

    @Expose()
    @IsDefined()
    @IsString()
    stateId!: string;

    @Expose()
    @IsDefined()
    @IsString()
    title!: string;

    @Expose()
    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @Expose()
    @IsDefined()
    @IsDate()
    updatedAt!: Date;
}