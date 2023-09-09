import { Expose, Type } from "class-transformer";
import { GroupDto } from "../../../shared/dtos";
import { QueryResponse } from "../../interfaces";
import { IsDefined, ValidateNested } from "class-validator";
import { BaseQueryResponse } from "../../bases";

export class GroupsQueryResponse extends BaseQueryResponse implements QueryResponse<GroupDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => GroupDto)
    content!: GroupDto[];
}