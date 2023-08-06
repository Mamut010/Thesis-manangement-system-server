import { Expose, Type } from "class-transformer";
import { RoleDto } from "../../../shared/dtos";
import { QueryResponse } from "../../interfaces";
import { IsDefined, ValidateNested } from "class-validator";
import { BaseQueryResponse } from "../../bases";

export class RolesQueryResponse extends BaseQueryResponse implements QueryResponse<RoleDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => RoleDto)
    content!: RoleDto[];
}