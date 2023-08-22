import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { UnexpectedError } from "../../contracts/errors/unexpected.error";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { RefreshToken } from "../../core/models/refresh-token.model";
import { RefreshTokenRepoInterface } from "../interfaces";
import { RefreshTokenCreateRequest } from "../../contracts/requests/refresh-token-create.request";
import { RefreshTokenDto } from "../../shared/dtos";
import { PlainTransformerInterface } from "../utils/plain-transfomer";

@injectable()
export class RefreshTokenRepo implements RefreshTokenRepoInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface) {

    }

    public async findOneByUserId(userId: string): Promise<RefreshTokenDto | null> {
        const record = await this.prisma.refreshToken.findUnique({
            where: {
                userId: userId
            }
        });
        if (!record) {
            return null;
        }
        return this.plainTransformer.toRefreshToken(record);
    }

    public async create(createRequest: RefreshTokenCreateRequest): Promise<RefreshTokenDto> {
        try {
            const record = await this.prisma.refreshToken.create({
                data: createRequest
            });
            return this.plainTransformer.toRefreshToken(record);
        }
        catch {
            throw new UnexpectedError(ERROR_MESSAGES.Unexpected.RefreshTokenCreationFailed);
        }
    }

    public async deleteAll(userId: string): Promise<number> {
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