import { RoleCreateRequest } from "../../contracts/requests/resources/role-create.request";
import { RoleUpdateRequest } from "../../contracts/requests/resources/role-update.request";
import { RolesQueryRequest } from "../../contracts/requests/resources/roles-query.request";
import { RolesQueryResponse } from "../../contracts/responses/resources/roles-query.response";
import { RoleDto } from "../../shared/dtos";

export interface RoleRepoInterface {
    query(queryRequest: RolesQueryRequest): Promise<RolesQueryResponse>;

    findOneById(id: number): Promise<RoleDto | null>;

    create(createRequest: RoleCreateRequest): Promise<RoleDto>;

    update(id: number, updateRequest: RoleUpdateRequest): Promise<RoleDto | null>;

    delete(id: number): Promise<boolean>;
}