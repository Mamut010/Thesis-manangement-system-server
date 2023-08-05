import { inject, injectable } from "inversify";
import { RoleServiceInterface } from "../interfaces/role.service.interface";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { PlainTransformerServiceInterface } from "../interfaces";
import { RolesQueryRequest } from "../../contracts/requests/roles-query.request";
import { RolesQueryResponse } from "../../contracts/responses/roles-query.response";
import { PrismaQueryCreatorInterface } from "../../lib/query";
import { RoleDto } from "../../shared/dtos";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { NOT_FOUND_ERROR_MESSAGES } from "../../core/constants/not-found-error-message";
import { RoleCreateRequest } from "../../contracts/requests/role-create.request";
import { RoleUpdateRequest } from "../../contracts/requests/role-update.request";
import { UNIQUE_CONSTRAINT_ERROR_MESSAGES } from "../../core/constants/unique-constraint-error-messages";
import { ConflictError } from "../../contracts/errors/conflict.error";
import { Role } from "../../core/models";

@injectable()
export class RoleService implements RoleServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerServiceInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface
    ) {

    }

    async getRoles(rolesQuery: RolesQueryRequest): Promise<RolesQueryResponse> {
        const model = this.queryCreator.createQueryModel(Role);
        const prismaQuery = this.queryCreator.createQueryObject(model, rolesQuery);

        const count = await this.prisma.role.count({ ...prismaQuery, skip: undefined, take: undefined });
        const roles = await this.prisma.role.findMany(prismaQuery);

        const response = new RolesQueryResponse();
        response.content = roles.map(item => this.plainTransformer.toRole(item));
        response.count = count;
        return response;
    }

    async getRole(roleId: number): Promise<RoleDto> {
        const role = await this.prisma.role.findUnique({
            where: {
                id: roleId
            }
        });

        if (!role) {
            throw new NotFoundError(NOT_FOUND_ERROR_MESSAGES.RoleNotFound);
        }

        return this.plainTransformer.toRole(role);
    }

    async createRole(createRequest: RoleCreateRequest): Promise<RoleDto> {
        if (!(await this.checkRoleName(createRequest.name))) {
            throw new ConflictError(UNIQUE_CONSTRAINT_ERROR_MESSAGES.RoleAlreadyExists);
        }

        const role = await this.prisma.role.create({
            data: createRequest
        });
        return this.plainTransformer.toRole(role);
    }

    async updateRole(roleId: number, updateRequest: RoleUpdateRequest): Promise<RoleDto> {
        try {
            await this.prisma.role.findUniqueOrThrow({
                where: {
                    id: roleId
            }});
        }
        catch {
            throw new NotFoundError(NOT_FOUND_ERROR_MESSAGES.RoleNotFound);
        }

        if (!(await this.checkRoleName(updateRequest.name))) {
            throw new ConflictError(UNIQUE_CONSTRAINT_ERROR_MESSAGES.RoleAlreadyExists);
        }

        const role = await this.prisma.role.update({
            where: {
                id: roleId
            },
            data: updateRequest
        });
        return this.plainTransformer.toRole(role);
    }

    async deleteRole(roleId: number): Promise<void> {
        try {
            await this.prisma.role.findUniqueOrThrow({
                where: {
                    id: roleId
            }});
        }
        catch {
            throw new NotFoundError(NOT_FOUND_ERROR_MESSAGES.RoleNotFound);
        }

        await this.prisma.role.delete({
            where: {
                id: roleId
            }
        });
    }

    private async checkRoleName(roleName?: string): Promise<boolean> {
        return !roleName || !(await this.prisma.role.findUnique({ where: { name: roleName } }));
    }
}