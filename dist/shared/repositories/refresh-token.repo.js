"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenRepo = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const injection_tokens_1 = require("../../core/constants/injection-tokens");
const client_1 = require("@prisma/client");
const unexpected_error_1 = require("../../contracts/errors/unexpected.error");
const unexpected_error_messages_1 = require("../../core/constants/unexpected-error-messages");
let RefreshTokenRepo = exports.RefreshTokenRepo = class RefreshTokenRepo {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(refreshToken) {
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
            throw new unexpected_error_1.UnexpectedError(unexpected_error_messages_1.UNEXPECTED_ERROR_MESSAGES.RefreshTokenCreationFailed);
        }
    }
    async deleteAll(userId) {
        try {
            const { count } = await this.prisma.refreshToken.deleteMany({
                where: {
                    userId: userId,
                }
            });
            return count;
        }
        catch {
            throw new unexpected_error_1.UnexpectedError(unexpected_error_messages_1.UNEXPECTED_ERROR_MESSAGES.RefreshTokenDeleteAllFailed);
        }
    }
};
exports.RefreshTokenRepo = RefreshTokenRepo = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(injection_tokens_1.INJECTION_TOKENS.Prisma)),
    tslib_1.__metadata("design:paramtypes", [client_1.PrismaClient])
], RefreshTokenRepo);
//# sourceMappingURL=refresh-token.repo.js.map