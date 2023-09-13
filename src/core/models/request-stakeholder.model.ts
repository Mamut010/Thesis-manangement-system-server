import { Expose } from "class-transformer";
import { IsBoolean, IsDefined, IsOptional, IsString } from "class-validator";

export class RequestStakeholder {
    @Expose()
    @IsDefined()
    @IsString()
    id!: string;

    @Expose()
    @IsDefined()
    @IsString()
    requestId!: string;

    @Expose()
    @IsOptional()
    @IsString()
    userId!: string | null;

    @Expose()
    @IsOptional()
    @IsString()
    groupId!: string | null;

    @Expose()
    @IsDefined()
    @IsBoolean()
    isAccepted!: boolean
}