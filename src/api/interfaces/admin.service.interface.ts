import { AdminUpdateRequest } from "../../contracts/requests/admin-update.request";
import { AdminInfoDto } from "../../shared/dtos";

export interface AdminServiceInterface {
    getAdminInfo(adminId: string): Promise<AdminInfoDto>;
    updateAdmin(adminId: string, updateRequest: AdminUpdateRequest): Promise<AdminInfoDto>;
}