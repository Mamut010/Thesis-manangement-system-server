/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */

import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { ITXClientDenyList } from '@prisma/client/runtime/library';
import { UnexpectedError } from "../../contracts/errors/unexpected.error";
import { LecturerRoles, ROLES } from "../../core/constants/roles";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { BadRequestError } from "../../contracts/errors/bad-request.error";
import { UserRepoInterface } from "../interfaces";
import { User } from "../../core/models";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { UserCreateRequestDto, UserUpdateRequestDto } from "../../shared/dtos";
import { plainToInstanceExactMatch } from "../../utils/class-transformer-helpers";

@injectable()
export class UserRepo implements UserRepoInterface {
    constructor(@inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient) {

    }

    async create(request: UserCreateRequestDto): Promise<User> {
        try {
            return await this.prisma.$transaction(async (tx) => {
                const user = await tx.user.create({
                    data: {
                        userId: request.userId,
                        username: request.username,
                        password: request.password,
                        email: request.email,
                        role: {
                            connect: {
                                id: request.role.id
                            }
                        }
                    }
                });

                const recordCreatingPromise = this.createRecordInAssociatedRepoByRole(tx, request);
                if (!recordCreatingPromise) {
                    throw new BadRequestError(ERROR_MESSAGES.NotFound.RoleNotFound);
                }

                await recordCreatingPromise;

                return plainToInstanceExactMatch(User, user);
            });
        }
        catch (err) {
            throw new UnexpectedError(ERROR_MESSAGES.Unexpected.UserCreationFailed);
        }
    }

    async update(request: UserUpdateRequestDto): Promise<User> {
        try {
            await this.prisma.user.findUniqueOrThrow({
                where: {
                    userId: request.userId,
                }
            });
        }
        catch {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.UserNotFound);
        }

        const user = await this.prisma.user.update({
            where: {
                userId: request.userId,
            },
            data: {
                ...request,
                roleId: undefined,
                role: {
                    connect: {
                        id: request.roleId
                    }
                }
            }
        });

        return plainToInstanceExactMatch(User, user);
    }

    async delete(userId: string): Promise<void> {
        try {
            await this.prisma.user.findUniqueOrThrow({
                where: {
                    userId: userId
            }});
        }
        catch {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.UserNotFound);
        }

        await this.prisma.user.delete({
            where: {
                userId: userId
            }
        });
    }

    private createRecordInAssociatedRepoByRole(tx: Omit<PrismaClient, ITXClientDenyList>, request: UserCreateRequestDto) {
        const associatedRepo = this.getAssociatedRepoByRole(request.role.name);

        if (associatedRepo) {
            const prismaRepo: any = tx[associatedRepo as never];
            return prismaRepo.create({
                data: {
                    userId: request.userId
                }
            }) as Promise<any>;
        }
    }

    private getAssociatedRepoByRole(roleName: string): string | undefined {
        if (roleName === ROLES.Admin) {
            return 'admin';
        }
        else if (roleName === ROLES.Student) {
            return 'student';
        }
        else if (LecturerRoles.some(role => role === roleName)) {
            return 'lecturer';
        }

        return undefined;
    }
}