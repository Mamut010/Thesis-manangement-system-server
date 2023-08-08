import { inject, injectable } from "inversify";
import { RoleServiceInterface } from "../../interfaces/resources/role.service.interface";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { RolesQueryRequest } from "../../../contracts/requests/resources/roles-query.request";
import { RolesQueryResponse } from "../../../contracts/responses/resources/roles-query.response";
import { PrismaQueryCreatorInterface } from "../../../lib/query";
import { RoleDto } from "../../../shared/dtos";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { RoleCreateRequest } from "../../../contracts/requests/resources/role-create.request";
import { RoleUpdateRequest } from "../../../contracts/requests/resources/role-update.request";
import { ERROR_MESSAGES } from "../../../contracts/constants/error-messages";
import { ConflictError } from "../../../contracts/errors/conflict.error";
import { Role } from "../../../core/models";
import { PlainTransformerInterface } from "../../utils/plain-transformer";
import { MethodNotAllowedError } from "../../../contracts/errors/method-not-allowed.error";
import { compareObjectByEntries, isObjectEmptyOrAllUndefined } from "../../../utils/object-helpers";
import { anyChanges } from "../../../utils/crud-helpers";

@injectable()
export class RoleService implements RoleServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface
    ) {

    }

    async getRoles(queryRequest: RolesQueryRequest): Promise<RolesQueryResponse> {
        const model = this.queryCreator.createQueryModel(Role);
        const prismaQuery = this.queryCreator.createQueryObject(model, queryRequest);

        const count = await this.prisma.role.count({ ...prismaQuery, skip: undefined, take: undefined });
        const roles = await this.prisma.role.findMany(prismaQuery);

        const response = new RolesQueryResponse();
        response.content = roles.map(item => this.plainTransformer.toRole(item));
        response.count = count;
        return response;
    }

    async getRole(id: number): Promise<RoleDto> {
        const role = await this.ensureRecordExists(id);
        return this.plainTransformer.toRole(role);
    }

    async createRole(createRequest: RoleCreateRequest): Promise<RoleDto> {
        this.ensureMethodAvailablity(ERROR_MESSAGES.MethodNotAllowed.RoleCreationNotAllowed);
        await this.ensureUniqueRoleName(createRequest.name);

        const role = await this.prisma.role.create({
            data: createRequest
        });
        return this.plainTransformer.toRole(role);
    }

    async updateRole(id: number, updateRequest: RoleUpdateRequest): Promise<RoleDto> {
        let record = await this.ensureRecordExists(id);
        if (anyChanges(record, updateRequest)) {
            record = await this.prisma.role.update({
                where: {
                    id: id
                },
                data: updateRequest
            });
        }

        return this.plainTransformer.toRole(record);
    }

    async deleteRole(id: number): Promise<void> {
        this.ensureMethodAvailablity(ERROR_MESSAGES.MethodNotAllowed.RoleDeletionNotAllowed);
        await this.ensureRecordExists(id);

        await this.prisma.role.delete({
            where: {
                id: id
            }
        });
    }

    private ensureMethodAvailablity(msg?: string) {
        throw new MethodNotAllowedError(msg);
    }

    private async ensureRecordExists(id: number) {
        try {
            return await this.prisma.role.findUniqueOrThrow({
                where: {
                    id: id
            }});
        }
        catch {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.RoleNotFound);
        }
    }

    private async ensureUniqueRoleName(roleName?: string) {
        if (roleName && (await this.prisma.role.findUnique({ where: { name: roleName } }))) {
            throw new ConflictError(ERROR_MESSAGES.UniqueConstraint.RoleAlreadyExists);
        }
    }
}