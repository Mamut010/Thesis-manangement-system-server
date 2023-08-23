import { RoleCreateRequest, RoleUpdateRequest, RolesQueryRequest } from "../../contracts/requests";
import { RolesQueryResponse } from "../../contracts/responses";
import { RoleDto } from "../../shared/dtos";

export interface RoleRepoInterface {
    query(queryRequest: RolesQueryRequest): Promise<RolesQueryResponse>;

    findOneById(id: number): Promise<RoleDto | null>;

    create(createRequest: RoleCreateRequest): Promise<RoleDto>;

    update(id: number, updateRequest: RoleUpdateRequest): Promise<RoleDto | null>;

    delete(id: number): Promise<boolean>;
}