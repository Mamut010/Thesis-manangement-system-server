import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { UnexpectedError } from "../../contracts/errors/unexpected.error";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { RefreshTokenRepoInterface } from "../interfaces";
import { RefreshTokenCreateRequest } from "../../contracts/requests/auth/refresh-token-create.request";
import { RefreshTokenDto } from "../../shared/dtos";
import { PlainTransformerInterface } from "../utils/plain-transfomer";
import { RefreshTokenUpsertRequest } from "../../contracts/requests/auth/refresh-token-upsert.request";

@injectable()
export class RefreshTokenRepo implements RefreshTokenRepoInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface) {

    }

    async findOneByUserId(userId: string): Promise<RefreshTokenDto | null> {
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

    async create(createRequest: RefreshTokenCreateRequest): Promise<RefreshTokenDto> {
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

    async upsert(upsertRequest: RefreshTokenUpsertRequest): Promise<RefreshTokenDto> {
        const record = await this.prisma.refreshToken.upsert({
            where: {
                userId: upsertRequest.userId
            },
            create: {
                userId: upsertRequest.userId,
                ...upsertRequest.create
            },
            update: upsertRequest.update,
        });
        return this.plainTransformer.toRefreshToken(record);
    }

    async deleteByUserId(userId: string): Promise<boolean> {
        try {
            const { count } = await this.prisma.refreshToken.deleteMany({
                where: {
                    userId: userId,
                }
            });
            return count > 0;
        }
        catch {
            throw new UnexpectedError(ERROR_MESSAGES.Unexpected.RefreshTokenDeletionFailed);
        }
    }
}