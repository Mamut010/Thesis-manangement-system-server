/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */

import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { ITXClientDenyList } from '@prisma/client/runtime/library';
import { UserCreatingRequestDto } from "../dtos/user-creating-request.dto";
import { UnexpectedError } from "../../contracts/errors/unexpected.error";
import { ROLES } from "../../core/constants/roles";
import { UNEXPECTED_ERROR_MESSAGES } from "../../core/constants/unexpected-error-messages";
import { BadRequestError } from "../../contracts/errors/bad-request.error";
import { UserRepoInterface } from "../interfaces";
import { User } from "../../core/models";
import { NOT_FOUND_ERROR_MESSAGES } from "../../core/constants/not-found-error-message";

@injectable()
export class UserRepo implements UserRepoInterface {
    constructor(@inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient) {

    }

    async create(request: UserCreatingRequestDto): Promise<User> {
        try {
            return await this.prisma.$transaction(async (tx) => {
                const user = await tx.user.create({
                    data: {
                        userId: request.userId,
                        username: request.username,
                        password: request.password,
                        email: request.email,
                        roleId: request.role.id
                    }
                });

                const recordCreatingPromise = this.createRecordInAssociatedRepoByRole(tx, request);
                if (!recordCreatingPromise) {
                    throw new BadRequestError(NOT_FOUND_ERROR_MESSAGES.RoleNotFound);
                }

                await recordCreatingPromise;

                return user;
            });
        }
        catch (err) {
            throw new UnexpectedError(UNEXPECTED_ERROR_MESSAGES.UserCreationFailed);
        }
    }

    private createRecordInAssociatedRepoByRole(tx: Omit<PrismaClient, ITXClientDenyList>, request: UserCreatingRequestDto) {
        const roleName = request.role.name;
        let associatedRepo: string = '';
        
        if (roleName === ROLES.Admin.valueOf()) {
            associatedRepo = 'admin';
        }
        else if (roleName === ROLES.Student.valueOf()) {
            associatedRepo = 'student';
        }
        else if ([ROLES.Lecturer1_1, ROLES.Lecturer1_2, ROLES.Lecturer2].find(role => role.valueOf() === roleName)) {
            associatedRepo = 'lecturer';
        }

        if (associatedRepo) {
            const prismaRepo: any = tx[associatedRepo as never];
            return prismaRepo.create({
                data: {
                    userId: request.userId
                }
            }) as Promise<any>;
        }
    }
}