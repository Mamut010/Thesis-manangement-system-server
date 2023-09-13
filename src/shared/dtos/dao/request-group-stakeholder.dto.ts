import { Expose } from "class-transformer";
import { IsBoolean, IsDefined, IsString } from "class-validator";

export class RequestGroupStakeholderDto {
    @Expose()
    @IsDefined()
    @IsString()
    groupId!: string;

    @Expose()
    @IsDefined()
    @IsString({ each: true })
    memberIds!: string[];

    @Expose()
    @IsDefined()
    @IsBoolean()
    isAccepted!: boolean;
}