import { RefreshToken } from "@prisma/client";

export interface RefreshTokenRepoInterface {
    create(refreshToken: RefreshToken): Promise<RefreshToken>;
    deleteAll(userId: string): Promise<number>;
}