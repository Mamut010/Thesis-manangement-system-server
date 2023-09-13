import { Expose } from "class-transformer";
import { IsBoolean, IsDefined, IsString } from "class-validator";

export class RequestUserStakeholderDto {
    @Expose()
    @IsDefined()
    @IsString()
    userId!: string;

    @Expose()
    @IsDefined()
    @IsBoolean()
    isAccepted!: boolean;
}