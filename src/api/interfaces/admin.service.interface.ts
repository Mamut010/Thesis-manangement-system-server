import { AdminInfoDto } from "../../shared/dtos";

export interface AdminServiceInterface {
    getAdminInfo(adminId: number): Promise<AdminInfoDto>;
}