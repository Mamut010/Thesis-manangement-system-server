"use strict";
/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepo = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const injection_tokens_1 = require("../../core/constants/injection-tokens");
const client_1 = require("@prisma/client");
const unexpected_error_1 = require("../../contracts/errors/unexpected.error");
const roles_1 = require("../../core/enums/roles");
const unexpected_error_messages_1 = require("../../core/constants/unexpected-error-messages");
const bad_request_error_1 = require("../../contracts/errors/bad-request.error");
const not_found_error_message_1 = require("../../core/constants/not-found-error-message");
let UserRepo = exports.UserRepo = class UserRepo {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(request) {
        try {
            return await this.prisma.$transaction(async (tx) => {
                const user = await tx.user.create({
                    data: {
                        userId: request.userId,
                        username: request.username,
                        password: request.password,
                        email: request.email,
                        roleId: request.role.id,
                        student: {
                            create: [
                                { userId: 2 }
                            ]
                        }
                    }
                });
                const recordCreatingPromise = this.createRecordInAssociatedRepoByRole(tx, request);
                if (!recordCreatingPromise) {
                    throw new bad_request_error_1.BadRequestError(not_found_error_message_1.NOT_FOUND_ERROR_MESSAGES.RoleNotFound);
                }
                await recordCreatingPromise;
                return user;
            });
        }
        catch (err) {
            throw new unexpected_error_1.UnexpectedError(unexpected_error_messages_1.UNEXPECTED_ERROR_MESSAGES.UserCreationFailed);
        }
    }
    createRecordInAssociatedRepoByRole(tx, request) {
        const roleName = request.role.name;
        let associatedRepo = '';
        if (roleName === roles_1.Roles.Admin.valueOf()) {
            associatedRepo = 'admin';
        }
        else if (roleName === roles_1.Roles.Student.valueOf()) {
            associatedRepo = 'student';
        }
        else if ([roles_1.Roles.Lecturer1_1, roles_1.Roles.Lecturer1_2, roles_1.Roles.Lecturer2].find(role => role.valueOf() === roleName)) {
            associatedRepo = 'lecturer';
        }
        if (associatedRepo) {
            const prismaRepo = tx[associatedRepo];
            return prismaRepo.create({
                data: {
                    userId: request.userId
                }
            });
        }
    }
};
exports.UserRepo = UserRepo = tslib_1.__decorate([
    (0, inversify_1.injectable)(),
    tslib_1.__param(0, (0, inversify_1.inject)(injection_tokens_1.INJECTION_TOKENS.Prisma)),
    tslib_1.__metadata("design:paramtypes", [client_1.PrismaClient])
], UserRepo);
//# sourceMappingURL=user.repo.js.map