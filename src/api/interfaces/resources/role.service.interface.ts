import { RoleCreateRequest, RoleUpdateRequest, RolesQueryRequest } from "../../../contracts/requests";
import { RolesQueryResponse } from "../../../contracts/responses";
import { RoleDto } from "../../../shared/dtos";

export interface RoleServiceInterface {
    getRoles(queryRequest: RolesQueryRequest) : Promise<RolesQueryResponse>;
    getRole(id: number): Promise<RoleDto>;
    createRole(createRequest: RoleCreateRequest): Promise<RoleDto>;
    updateRole(id: number, updateRequest: RoleUpdateRequest): Promise<RoleDto>;
    deleteRole(id: number): Promise<void>;
}