import { RoleCreateRequest } from "../../contracts/requests/resources/role-create.request";
import { RoleUpdateRequest } from "../../contracts/requests/resources/role-update.request";
import { RolesQueryRequest } from "../../contracts/requests/resources/roles-query.request";
import { RolesQueryResponse } from "../../contracts/responses/resources/roles-query.response";
import { RoleDto } from "../../shared/dtos";

export interface RoleServiceInterface {
    getRoles(rolesQuery: RolesQueryRequest) : Promise<RolesQueryResponse>;
    getRole(roleId: number): Promise<RoleDto>;
    createRole(createRequest: RoleCreateRequest): Promise<RoleDto>;
    updateRole(roleId: number, updateRequest: RoleUpdateRequest): Promise<RoleDto>;
    deleteRole(roleId: number): Promise<void>;
}