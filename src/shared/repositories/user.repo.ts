/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */

import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { ITXClientDenyList } from '@prisma/client/runtime/library';
import { UnexpectedError } from "../../contracts/errors/unexpected.error";
import { ROLES } from "../../core/constants/roles";
import { UNEXPECTED_ERROR_MESSAGES } from "../../core/constants/unexpected-error-messages";
import { BadRequestError } from "../../contracts/errors/bad-request.error";
import { UserRepoInterface } from "../interfaces";
import { User } from "../../core/models";
import { NOT_FOUND_ERROR_MESSAGES } from "../../core/constants/not-found-error-message";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { UserCreateRequestDto, UserUpdateRequestDto } from "../dtos";
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
                    throw new BadRequestError(NOT_FOUND_ERROR_MESSAGES.RoleNotFound);
                }

                await recordCreatingPromise;

                return plainToInstanceExactMatch(User, user);
            });
        }
        catch (err) {
            throw new UnexpectedError(UNEXPECTED_ERROR_MESSAGES.UserCreationFailed);
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
            throw new NotFoundError(NOT_FOUND_ERROR_MESSAGES.UserNotFound);
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

    async delete(userId: number): Promise<void> {
        try {
            await this.prisma.user.findUniqueOrThrow({
                where: {
                    userId: userId
            }});

            await this.prisma.user.delete({
                where: {
                    userId: userId
                }
            });
        }
        catch {
            throw new NotFoundError(NOT_FOUND_ERROR_MESSAGES.UserNotFound);
        }
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
        else if ([ROLES.Lecturer1_1, ROLES.Lecturer1_2, ROLES.Lecturer2].find(role => role === roleName)) {
            return 'lecturer';
        }

        return undefined;
    }
}