"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminThesisService = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const injection_tokens_1 = require("../../core/constants/injection-tokens");
const client_1 = require("@prisma/client");
const not_found_error_1 = require("../../contracts/errors/not-found.error");
const not_found_error_message_1 = require("../../core/constants/not-found-error-message");
let AdminThesisService = exports.AdminThesisService = class AdminThesisService {
    constructor(prisma, plainTransformer) {
        this.prisma = prisma;
        this.plainTransformer = plainTransformer;
    }
    async getThesisInfo(thesisId) {
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
            throw new not_found_error_1.NotFoundError(not_found_error_message_1.NOT_FOUND_ERROR_MESSAGES.StudentNotFound);
        }
        return this.plainTransformer.toThesisInfo(thesis);
    }
};
exports.AdminThesisService = AdminThesisService = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(injection_tokens_1.INJECTION_TOKENS.Prisma)),
    tslib_1.__param(1, (0, inversify_1.inject)(injection_tokens_1.INJECTION_TOKENS.PlainTransformer)),
    tslib_1.__metadata("design:paramtypes", [client_1.PrismaClient, Object])
], AdminThesisService);
//# sourceMappingURL=admin-thesis.service.js.map