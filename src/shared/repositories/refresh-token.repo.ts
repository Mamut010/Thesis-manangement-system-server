import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { UnexpectedError } from "../../contracts/errors/unexpected.error";
import { ERROR_MESSAGES } from "../../core/constants/error-messages";
import { RefreshToken } from "../../core/models/refresh-token.model";
import { RefreshTokenRepoInterface } from "../interfaces";

@injectable()
export class RefreshTokenRepo implements RefreshTokenRepoInterface {
    constructor(@inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient) {

    }

    public async create(refreshToken: RefreshToken): Promise<RefreshToken> {
        try {
            return await this.prisma.refreshToken.create({
                data: {
                    userId: refreshToken.userId,
                    token: refreshToken.token,
                    exp: refreshToken.exp,
                }
            });
        }
        catch {
            throw new UnexpectedError(ERROR_MESSAGES.Unexpected.RefreshTokenCreationFailed);
        }
    }

    public async deleteAll(userId: number): Promise<number> {
        try {
            const { count } = await this.prisma.refreshToken.deleteMany({
                where: {
                    userId: userId,
                }
            });
            return count;
        }
        catch {
            throw new UnexpectedError(ERROR_MESSAGES.Unexpected.RefreshTokenDeleteAllFailed);
        }
    }
}