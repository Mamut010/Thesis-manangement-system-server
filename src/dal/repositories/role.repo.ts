import { inject, injectable } from "inversify";
import { RoleRepoInterface } from "../interfaces";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { PlainTransformerInterface } from "../utils/plain-transfomer";
import { AutoQueryCreatable, PrismaQueryCreatorInterface } from "../../lib/query";
import { RolesQueryRequest, RoleCreateRequest, RoleUpdateRequest } from "../../contracts/requests";
import { RolesQueryResponse } from "../../contracts/responses";
import { Role } from "../../core/models";
import { RoleDto } from "../../shared/dtos";
import { anyChanges } from "../utils/crud-helpers";
import { wrapUniqueConstraint } from "../utils/prisma-helpers";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";

@injectable()
export class RoleRepo implements RoleRepoInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface
    ) {

    }

    async query(queryRequest: RolesQueryRequest): Promise<RolesQueryResponse> {
        const prismaQuery = this.createPrismaQuery(queryRequest);

        const count = await this.prisma.role.count({ where: prismaQuery.where });
        const roles = await this.prisma.role.findMany(prismaQuery);

        const response = new RolesQueryResponse();
        response.content = roles.map(item => this.plainTransformer.toRole(item));
        response.count = count;
        return response;
    }

    async findOneById(id: number): Promise<RoleDto | null> {
        const record = await this.findRecordById(id);
        if (!record) {
            return null;
        }
        return this.plainTransformer.toRole(record);
    }

    async create(createRequest: RoleCreateRequest): Promise<RoleDto> {
        const impl = async () => {
            const record = await this.prisma.role.create({
                data: createRequest
            });
            return this.plainTransformer.toRole(record);
        }

        return wrapUniqueConstraint(impl, ERROR_MESSAGES.UniqueConstraint.RoleAlreadyExists);
    }

    async update(id: number, updateRequest: RoleUpdateRequest): Promise<RoleDto | null> {
        const impl = async () => {
            let record = await this.findRecordById(id);
            if (!record) {
                return null;
            }

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

        return wrapUniqueConstraint(impl, ERROR_MESSAGES.UniqueConstraint.RoleAlreadyExists);
    }

    async delete(id: number): Promise<boolean> {
        const { count } = await this.prisma.role.deleteMany({
            where: {
                id: id
            }
        });
        return count > 0;
    }

    private async findRecordById(id: number) {
        return await this.prisma.role.findUnique({
            where: {
                id: id
            },
        });
    }

    private createPrismaQuery(queryRequest: AutoQueryCreatable) {
        const model = this.queryCreator.createQueryModel(Role);
        return this.queryCreator.createQueryObject(model, queryRequest);
    }
}