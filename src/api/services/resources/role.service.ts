import { inject, injectable } from "inversify";
import { RoleServiceInterface } from "../../interfaces/resources/role.service.interface";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { RolesQueryRequest, RoleCreateRequest, RoleUpdateRequest } from "../../../contracts/requests";
import { RolesQueryResponse } from "../../../contracts/responses";
import { RoleDto } from "../../../shared/dtos";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../contracts/constants/error-messages";
import { MethodNotAllowedError } from "../../../contracts/errors/method-not-allowed.error";
import { RoleRepoInterface } from "../../../dal/interfaces";

@injectable()
export class RoleService implements RoleServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.RoleRepo) private roleRepo: RoleRepoInterface) {

    }

    async getRoles(queryRequest: RolesQueryRequest): Promise<RolesQueryResponse> {
        return await this.roleRepo.query(queryRequest);
    }

    async getRole(id: number): Promise<RoleDto> {
        return await this.ensureRecordExists(id);
    }

    async createRole(createRequest: RoleCreateRequest): Promise<RoleDto> {
        this.ensureMethodAvailablity(ERROR_MESSAGES.MethodNotAllowed.RoleCreationNotAllowed);
        return await this.roleRepo.create(createRequest);
    }

    async updateRole(id: number, updateRequest: RoleUpdateRequest): Promise<RoleDto> {
        const record = await this.roleRepo.update(id, updateRequest);
        if (!record) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.RoleNotFound);
        }

        return record;
    }

    async deleteRole(id: number): Promise<void> {
        this.ensureMethodAvailablity(ERROR_MESSAGES.MethodNotAllowed.RoleDeletionNotAllowed);
        await this.roleRepo.delete(id);
    }

    private async ensureRecordExists(id: number) {
        const result = await this.roleRepo.findOneById(id);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.RoleNotFound);
        }
        return result;
    }

    private ensureMethodAvailablity(msg?: string) {
        throw new MethodNotAllowedError(msg);
    }
}