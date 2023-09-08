import { Expose, Type } from "class-transformer";
import { GroupInfoDto } from "../../../shared/dtos";
import { QueryResponse } from "../../interfaces";
import { IsDefined, ValidateNested } from "class-validator";
import { BaseQueryResponse } from "../../bases";

export class GroupInfosQueryResponse extends BaseQueryResponse implements QueryResponse<GroupInfoDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => GroupInfoDto)
    content!: GroupInfoDto[];
}