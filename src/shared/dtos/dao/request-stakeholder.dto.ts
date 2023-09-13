import { Expose, Type } from "class-transformer";
import { IsDefined, IsString, ValidateNested } from "class-validator";
import { RequestUserStakeholderDto } from "./request-user-stakeholder.dto";
import { RequestGroupStakeholderDto } from "./request-group-stakeholder.dto";

export class RequestStakeholderDto {
    @Expose()
    @IsDefined()
    @IsString()
    requestId!: string;

    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => RequestUserStakeholderDto)
    userStakeholders!: RequestUserStakeholderDto[];

    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => RequestGroupStakeholderDto)
    groupStakeholders!: RequestGroupStakeholderDto[];
}