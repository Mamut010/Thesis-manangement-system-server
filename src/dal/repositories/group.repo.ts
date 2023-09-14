import { inject, injectable } from "inversify";
import { GroupRepoInterface } from "../interfaces";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { PlainTransformerInterface } from "../utils/plain-transfomer";
import { AutoQueryCreatable, PrismaQueryCreatorInterface } from "../../lib/query";
import { GroupsQueryRequest, GroupCreateRequest, GroupUpdateRequest, GroupMembersUpdateRequest } from "../../contracts/requests";
import { GroupsQueryResponse } from "../../contracts/responses";
import { Group } from "../../core/models";
import { GroupDto } from "../../shared/dtos";
import { anyChanges } from "../utils/crud-helpers";
import { groupInclude } from "../constants/includes";
import { isObjectEmptyOrAllUndefined } from "../../utils/object-helpers";
import { removeSharedElements } from "../../utils/array-helpers";
import { createUserWhereUniqueInputs } from "../utils/prisma-helpers";

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

    async findManyByIds(ids: string[]): Promise<GroupDto[]> {
        const records = await this.prisma.group.findMany({
            where: {
                id: {
                    in: ids
                }
            },
            include: groupInclude
        });
        return records.map(item => this.plainTransformer.toGroup(item));
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

    async updateMembers(id: string, updateRequest: GroupMembersUpdateRequest): Promise<GroupDto | null> {
        let record = await this.findRecordById(id);
        if (!record) {
            return null;
        }
        else if (isObjectEmptyOrAllUndefined(updateRequest)) {
            return this.plainTransformer.toGroup(record);
        }

        const { arr1, arr2 } = removeSharedElements(updateRequest.addedUserIds, updateRequest.removedUserIds);
        const addedUserIds = arr1;
        const removedUserIds = arr2;

        record = await this.prisma.group.update({
            where: {
                id: id
            },
            data: {
                users: {
                    connect: createUserWhereUniqueInputs(addedUserIds),
                    disconnect: createUserWhereUniqueInputs(removedUserIds),
                }
            },
            include: groupInclude
        });

        return this.plainTransformer.toGroup(record);
    }

    async setMembers(id: string, userIds: string[]): Promise<GroupDto | null> {
        let record = await this.findRecordById(id);
        if (!record) {
            return null;
        }

        record = await this.prisma.group.update({
            where: {
                id: id
            },
            data: {
                users: {
                    set: createUserWhereUniqueInputs(userIds)
                }
            },
            include: groupInclude,
        });
        return this.plainTransformer.toGroup(record);
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
        const fieldMap = {
            memberId: 'users.some.userId',
        };

        const model = this.queryCreator.createQueryModel(Group);
        return this.queryCreator.createQueryObject(model, queryRequest, { 
            fieldMap,
            orderBySkippedFields: ['memberId']
        });
    }
}