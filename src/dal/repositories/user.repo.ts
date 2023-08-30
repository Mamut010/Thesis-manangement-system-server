import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { LecturerRoles, Role } from "../../core/constants/roles";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { UserRepoInterface } from "../interfaces";
import { User } from "../../core/models";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { UserCreateRequest, UserUpdateRequest, UsersQueryRequest } from "../../contracts/requests";
import { PlainTransformerInterface } from "../utils/plain-transfomer";
import { AutoQueryCreatable, PrismaQueryCreatorInterface } from "../../lib/query";
import { UserDto } from "../../shared/dtos";
import { UsersQueryResponse } from "../../contracts/responses";
import { anyChanges } from "../utils/crud-helpers";
import { wrapUniqueConstraint } from "../utils/prisma-helpers";
import { roleInclude } from "../constants/includes";

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
        const users = await this.prisma.user.findMany({
            ...prismaQuery,
            include: roleInclude,
        });

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
            include: roleInclude,
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
                    role: {
                        connect: {
                            name: createRequest.roleName
                        }
                    },
                    [associatedRepo]: {
                        create: {}
                    }
                },
                include: roleInclude,
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
                    include: roleInclude,
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
            include: roleInclude,
        });
    }

    private createPrismaQuery(queryRequest: AutoQueryCreatable) {
        const fieldMap = {
            roleName: 'role.name',
        };
        const model = this.queryCreator.createQueryModel(User);
        return this.queryCreator.createQueryObject(model, queryRequest, { fieldMap });
    }

    private getAssociatedRepoByRole(roleName: string) {
        if (roleName === Role.Admin) {
            return 'admin';
        }
        else if (roleName === Role.Student) {
            return 'student';
        }
        else if (LecturerRoles.some(role => role === roleName)) {
            return 'lecturer';
        }

        return undefined;
    }
}