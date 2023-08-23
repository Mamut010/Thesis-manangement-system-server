import { RefreshTokenCreateRequest } from "../../contracts/requests/auth/refresh-token-create.request";
import { RefreshTokenUpsertRequest } from "../../contracts/requests/auth/refresh-token-upsert.request";
import { RefreshTokenDto } from "../../shared/dtos";

export interface RefreshTokenRepoInterface {
    findOneByUserId(userId: string): Promise<RefreshTokenDto | null>;
    create(createRequest: RefreshTokenCreateRequest): Promise<RefreshTokenDto>;
    upsert(upsertRequest: RefreshTokenUpsertRequest): Promise<RefreshTokenDto>;
    deleteByUserId(userId: string): Promise<boolean>;
}