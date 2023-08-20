import { AdminInfoDto } from "../../shared/dtos";

export interface AdminServiceInterface {
    getAdminInfo(adminId: string): Promise<AdminInfoDto>;
}