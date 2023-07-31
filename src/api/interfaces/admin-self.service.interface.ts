import { AdminInfoDto } from "../../shared/dtos";

export interface AdminSelfServiceInterface {
    getAdminInfo(adminId: number): Promise<AdminInfoDto>;
}