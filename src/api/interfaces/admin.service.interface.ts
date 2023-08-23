import { AdminInfoUpdateRequest } from "../../contracts/requests";
import { AdminInfoDto } from "../../shared/dtos";

export interface AdminServiceInterface {
    getAdminInfo(adminId: string): Promise<AdminInfoDto>;
    updateAdminInfo(adminId: string, updateRequest: AdminInfoUpdateRequest): Promise<AdminInfoDto>;
}