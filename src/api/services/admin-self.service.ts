import { inject, injectable } from "inversify";
import { 
    AdminSelfServiceInterface, 
    PlainTransformerServiceInterface 
} from "../interfaces";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { NOT_FOUND_ERROR_MESSAGES } from "../../core/constants/not-found-error-message";
import { AdminInfoDto } from "../../shared/dtos";

@injectable()
export class AdminSelfService implements AdminSelfServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerServiceInterface) {

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
            throw new NotFoundError(NOT_FOUND_ERROR_MESSAGES.AdminNotFound);
        }

        return this.plainTransformer.toAdminInfo(admin);
    }
}