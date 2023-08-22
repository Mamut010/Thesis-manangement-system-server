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
import { plainToInstanceExactMatch } from "../../utils/class-transformer-helpers";
import { UserCreateRequest } from "../../contracts/requests/user-create-request.dto";
import { UserUpdateRequest } from "../../contracts/requests/user-update-request.dto";
import { PlainTransformerInterface } from "../../shared/utils/plain-transformer";
import { AutoQueryCreatable, PrismaQueryCreatorInterface } from "../../lib/query";
import { UserDto } from "../../shared/dtos";
import { UsersQueryRequest } from "../../contracts/requests/users-query.request";
import { UsersQueryResponse } from "../../contracts/responses/users-query.response";
import { anyChanges } from "../utils/crud-helpers";
import { wrapUniqueConstraint } from "../utils/prisma-helpers";

@injectable()
export class UserRepo implements UserRepoInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface
    ) {

    }

    async query(queryRequest: UsersQueryRequest): Promise<UsersQueryResponse> {
        const prismaQuery = this.createPrismaQuery(queryRequest);

        const count = await this.prisma.user.count({ where: prismaQuery.where });
        const users = await this.prisma.user.findMany(prismaQuery);

        const response = new UsersQueryResponse();
        response.content = users.map(item => this.plainTransformer.toUser(item));
        response.count = count;
        return response;
    }

    async findOneById(id: string): Promise<UserDto | null> {
        const record = await this.findRecordById(id);
        if (!record) {
            return null;
        }
        return this.plainTransformer.toUser(record);
    }

    async findManyByIds(ids: string[]): Promise<UserDto[]> {
        const records = await this.prisma.user.findMany({
            where: {
                userId: {
                    in: ids
                }
            },
        });
        return records.map(item => this.plainTransformer.toUser(item));
    }

    async create(createRequest: UserCreateRequest): Promise<UserDto> {
        const associatedRepo = this.getAssociatedRepoByRole(createRequest.roleName);
        if (!associatedRepo) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.RoleNotFound);
        }

        const impl = async () => {
            const record = await this.prisma.user.create({
                data: {
                    userId: createRequest.userId,
                    username: createRequest.username,
                    password: createRequest.password,
                    email: createRequest.email,
                    signature: createRequest.signature,
                    role: {
                        connect: {
                            name: createRequest.roleName
                        }
                    },
                    [associatedRepo]: {
                        create: {}
                    }
                },
                include: {
                    role: true
                }
            });

            return this.plainTransformer.toUser(record);
        }

        return wrapUniqueConstraint(impl, ERROR_MESSAGES.Unexpected.UserCreationFailed);
    }

    async update(id: string, updateRequest: UserUpdateRequest): Promise<UserDto | null> {
        const impl = async () => {
            let record = await this.findRecordById(id);
            if (!record) {
                return null;
            }
    
            if (anyChanges(record, updateRequest)) {
                record = await this.prisma.user.update({
                    where: {
                        userId: id
                    },
                    data: updateRequest,
                });
            }
    
            return this.plainTransformer.toUser(record);
        }

        return wrapUniqueConstraint(impl, ERROR_MESSAGES.UniqueConstraint.UserAlreadyExists);
    }

    async delete(id: string): Promise<boolean> {
        const { count } = await this.prisma.user.deleteMany({
            where: {
                userId: id
            }
        });
        return count > 0;
    }

    private async findRecordById(id: string) {
        return await this.prisma.user.findUnique({
            where: {
                userId: id
            },
        });
    }

    private createPrismaQuery(queryRequest: AutoQueryCreatable) {
        const model = this.queryCreator.createQueryModel(User);
        return this.queryCreator.createQueryObject(model, queryRequest);
    }

    private getAssociatedRepoByRole(roleName: string) {
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