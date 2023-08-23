import { AdminInfoUpdateRequest } from "../../contracts/requests/api/admin-info-update.request";
import { AdminInfoDto } from "../../shared/dtos";

export interface AdminServiceInterface {
    getAdminInfo(adminId: string): Promise<AdminInfoDto>;
    updateAdminInfo(adminId: string, updateRequest: AdminInfoUpdateRequest): Promise<AdminInfoDto>;
}