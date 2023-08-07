import { inject, injectable } from "inversify";
import { AdminServiceInterface } from "../interfaces";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../core/constants/error-messages";
import { AdminInfoDto } from "../../shared/dtos";
import { PlainTransformerInterface } from "../utils/plain-transformer";

@injectable()
export class AdminService implements AdminServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface) {

    }

    async getAdminInfo(adminId: number): Promise<AdminInfoDto> {
        const admin = await this.prisma.admin.findUnique({
            where: {
                userId: adminId
            },
            include: {
                user: true,
            }
        });

        if (!admin) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.AdminNotFound);
        }

        return this.plainTransformer.toAdminInfo(admin);
    }
}