import { AdminUpdateRequest } from "../../contracts/requests/admin-update.request";
import { AdminDto } from "../../shared/dtos";

export interface AdminRepoInterface {
    findOneById(id: string): Promise<AdminDto | null>;
    update(id: string, updateRequest: AdminUpdateRequest): Promise<AdminDto | null>;
}