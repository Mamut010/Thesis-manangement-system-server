import { RefreshTokenCreateRequest, RefreshTokenUpsertRequest } from "../../contracts/requests";
import { RefreshTokenDto } from "../../shared/dtos";

export interface RefreshTokenRepoInterface {
    findOneByUserId(userId: string): Promise<RefreshTokenDto | null>;
    create(createRequest: RefreshTokenCreateRequest): Promise<RefreshTokenDto>;
    upsert(upsertRequest: RefreshTokenUpsertRequest): Promise<RefreshTokenDto>;
    deleteByUserId(userId: string): Promise<boolean>;
}