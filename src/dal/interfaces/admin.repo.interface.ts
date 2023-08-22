import { AdminUpdateRequest } from "../../contracts/requests/api/admin-update.request";
import { AdminInfoDto } from "../../shared/dtos";

export interface AdminRepoInterface {
    findOneById(id: string): Promise<AdminInfoDto | null>;
    update(id: string, updateRequest: AdminUpdateRequest): Promise<AdminInfoDto | null>;
}