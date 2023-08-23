import { AdminUpdateRequest } from "../../contracts/requests";
import { AdminDto } from "../../shared/dtos";

export interface AdminRepoInterface {
    findOneById(id: string): Promise<AdminDto | null>;
    update(id: string, updateRequest: AdminUpdateRequest): Promise<AdminDto | null>;
}