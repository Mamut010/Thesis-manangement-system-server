import { inject, injectable } from "inversify";
import { AdminServiceInterface } from "../interfaces";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { AdminInfoDto } from "../../shared/dtos";
import { AdminRepoInterface } from "../../dal/interfaces";
import { AdminUpdateRequest } from "../../contracts/requests";
import { MapperServiceInterface } from "../../shared/interfaces";

@injectable()
export class AdminService implements AdminServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.AdminRepo) private adminRepo: AdminRepoInterface,
        @inject(INJECTION_TOKENS.MapperService) private mapper: MapperServiceInterface) {

    }

    async getAdminInfo(adminId: string): Promise<AdminInfoDto> {
        const result = await this.ensureAdminExists(adminId);
        return this.mapper.map(AdminInfoDto, result);
    }

    async updateAdminInfo(adminId: string, updateRequest: AdminUpdateRequest): Promise<AdminInfoDto> {
        const result = await this.adminRepo.update(adminId, updateRequest);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.AdminNotFound);
        }

        return this.mapper.map(AdminInfoDto, result);
    }

    private async ensureAdminExists(id: string) {
        const result = await this.adminRepo.findOneById(id);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.AdminNotFound);
        }
        return result;
    }
}