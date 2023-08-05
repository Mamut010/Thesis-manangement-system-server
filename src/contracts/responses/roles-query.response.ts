import { Type } from "class-transformer";
import { RoleDto } from "../../shared/dtos";
import { BaseQueryResponse } from "./base-query.response";

export class RolesQueryResponse extends BaseQueryResponse<RoleDto> {
    @Type(() => RoleDto)
    content!: RoleDto[];
}