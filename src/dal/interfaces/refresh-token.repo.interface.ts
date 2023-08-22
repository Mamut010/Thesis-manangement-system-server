import { RefreshTokenCreateRequest } from "../../contracts/requests/refresh-token-create.request";
import { RefreshTokenDto } from "../../shared/dtos";

export interface RefreshTokenRepoInterface {
    findOneByUserId(userId: string): Promise<RefreshTokenDto | null>;
    create(createRequest: RefreshTokenCreateRequest): Promise<RefreshTokenDto>;
    deleteAll(userId: string): Promise<number>;
}