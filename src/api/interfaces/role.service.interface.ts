import { RoleCreateRequest } from "../../contracts/requests/role-create.request";
import { RoleUpdateRequest } from "../../contracts/requests/role-update.request";
import { RolesQueryRequest } from "../../contracts/requests/roles-query.request";
import { RolesQueryResponse } from "../../contracts/responses/roles-query.response";
import { RoleDto } from "../../shared/dtos";

export interface RoleServiceInterface {
    getRoles(rolesQuery: RolesQueryRequest) : Promise<RolesQueryResponse>;
    getRole(roleId: number): Promise<RoleDto>;
    createRole(createRequest: RoleCreateRequest): Promise<RoleDto>;
    updateRole(roleId: number, updateRequest: RoleUpdateRequest): Promise<RoleDto>;
    deleteRole(roleId: number): Promise<void>;
}