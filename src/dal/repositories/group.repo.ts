import { inject, injectable } from "inversify";
import { GroupRepoInterface } from "../interfaces";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { PlainTransformerInterface } from "../utils/plain-transfomer";
import { AutoQueryCreatable, PrismaQueryCreatorInterface } from "../../lib/query";
import { GroupsQueryRequest, GroupCreateRequest, GroupUpdateRequest } from "../../contracts/requests";
import { GroupsQueryResponse } from "../../contracts/responses";
import { Group } from "../../core/models";
import { GroupDto } from "../../shared/dtos";
import { anyChanges } from "../utils/crud-helpers";
import { groupInclude } from "../constants/includes";

@injectable()
export class GroupRepo implements GroupRepoInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface
    ) {

    }

    async query(queryRequest: GroupsQueryRequest): Promise<GroupsQueryResponse> {
        const prismaQuery = this.createPrismaQuery(queryRequest);

        const count = await this.prisma.group.count({ where: prismaQuery.where });
        const groups = await this.prisma.group.findMany({
            ...prismaQuery,
            include: groupInclude
        });

        const response = new GroupsQueryResponse();
        response.content = groups.map(item => this.plainTransformer.toGroup(item));
        response.count = count;
        return response;
    }

    async findOneById(id: string): Promise<GroupDto | null> {
        const record = await this.findRecordById(id);
        if (!record) {
            return null;
        }
        return this.plainTransformer.toGroup(record);
    }

    async create(createRequest: GroupCreateRequest): Promise<GroupDto> {
        const record = await this.prisma.group.create({
            data: createRequest,
            include: groupInclude
        });
        return this.plainTransformer.toGroup(record);
    }

    async update(id: string, updateRequest: GroupUpdateRequest): Promise<GroupDto | null> {
        let record = await this.findRecordById(id);
        if (!record) {
            return null;
        }

        if (anyChanges(record, updateRequest)) {
            record = await this.prisma.group.update({
                where: {
                    id: id
                },
                data: updateRequest,
                include: groupInclude
            });
        }

        return this.plainTransformer.toGroup(record);
    }

    async delete(id: string): Promise<boolean> {
        const { count } = await this.prisma.group.deleteMany({
            where: {
                id: id
            }
        });
        return count > 0;
    }

    private async findRecordById(id: string) {
        return await this.prisma.group.findUnique({
            where: {
                id: id
            },
            include: groupInclude
        });
    }

    private createPrismaQuery(queryRequest: AutoQueryCreatable) {
        const model = this.queryCreator.createQueryModel(Group);
        return this.queryCreator.createQueryObject(model, queryRequest);
    }
}