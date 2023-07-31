import { RefreshToken } from "../../core/models/refresh-token.model";

export interface RefreshTokenRepoInterface {
    create(refreshToken: RefreshToken): Promise<RefreshToken>;
    deleteAll(userId: number): Promise<number>;
}