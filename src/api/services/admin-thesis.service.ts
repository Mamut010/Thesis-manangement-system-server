import { inject, injectable } from "inversify";
import { AdminThesisServiceInterface, PlainTransformerServiceInterface } from "../interfaces";
import { ThesisInfoDto } from "../../shared/dtos";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { NOT_FOUND_ERROR_MESSAGES } from "../../core/constants/not-found-error-message";

@injectable()
export class AdminThesisService implements AdminThesisServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerServiceInterface) {

    }

    async getThesisInfo(thesisId: number): Promise<ThesisInfoDto> {
        const thesis = await this.prisma.thesis.findUnique({
            where: {
                id: thesisId
            },
            include: {
                topic: true,
                field: true,
            }
        });

        if (!thesis) {
            throw new NotFoundError(NOT_FOUND_ERROR_MESSAGES.StudentNotFound);
        }

        return this.plainTransformer.toThesisInfo(thesis);
    }
}