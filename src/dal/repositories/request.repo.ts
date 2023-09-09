import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { PlainTransformerInterface } from "../utils/plain-transfomer";
import { RequesstStakeholdersUpdateRequest, RequestsQueryRequest } from "../../contracts/requests";
import { RequestRepoInterface } from "../interfaces/request.repo.interface";
import { RequestsQueryResponse } from "../../contracts/responses";
import { RequestDto } from "../../shared/dtos";
import { AutoQueryCreatable, PrismaQueryCreatorInterface } from "../../lib/query";
import { Request } from "../../core/models";
import { requestInclude } from "../constants/includes";
import { isObjectEmptyOrAllUndefined } from "../../utils/object-helpers";
import { removeSharedElements } from "../../utils/array-helpers";
import { createUserWhereUniqueInputs } from "../utils/prisma-helpers";

@injectable()
export class RequestRepo implements RequestRepoInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface
    ) {

    }

    async query(queryRequest: RequestsQueryRequest): Promise<RequestsQueryResponse> {
        const prismaQuery = this.createPrismaQuery(queryRequest);

        const count = await this.prisma.request.count({ where: prismaQuery.where });
        const records = await this.prisma.request.findMany({
            ...prismaQuery,
            include: requestInclude,
        });

        const response = new RequestsQueryResponse();
        response.content = records.map(item => this.plainTransformer.toRequest(item));
        response.count = count;
        return response;
    }

    async findOneById(id: string): Promise<RequestDto | null> {
        const record = await this.findRecordById(id);
        if (!record) {
            return null;
        }
        
        return this.plainTransformer.toRequest(record);
    }

    async delete(id: string): Promise<boolean> {
        const { count } = await this.prisma.request.deleteMany({
            where: {
                id: id
            }
        });
        return count > 0;
    }

    async updateMembers(id: string, updateRequest: RequesstStakeholdersUpdateRequest): Promise<RequestDto | null> {
        let record = await this.findRecordById(id);
        if (!record) {
            return null;
        }
        else if (isObjectEmptyOrAllUndefined(updateRequest)) {
            return this.plainTransformer.toRequest(record);
        }
        const { arr1, arr2 } = removeSharedElements(updateRequest.addedUserIds, updateRequest.removedUserIds);
        const addedUserIds = arr1;
        const removedUserIds = arr2;

        record = await this.prisma.request.update({
            where: {
                id: id
            },
            data: {
                stakeholders: {
                    connect: createUserWhereUniqueInputs(addedUserIds),
                    disconnect: createUserWhereUniqueInputs(removedUserIds),
                }
            },
            include: requestInclude
        });

        return this.plainTransformer.toRequest(record);
    }

    async setMembers(id: string, userIds: string[]): Promise<RequestDto | null> {
        let record = await this.findRecordById(id);
        if (!record) {
            return null;
        }

        record = await this.prisma.request.update({
            where: {
                id: id
            },
            data: {
                stakeholders: {
                    set: createUserWhereUniqueInputs(userIds)
                }
            },
            include: requestInclude,
        });
        return this.plainTransformer.toRequest(record);
    }

    private async findRecordById(id: string) {
        return await this.prisma.request.findUnique({
            where: {
                id: id,
            },
            include: requestInclude
        });
    }

    private createPrismaQuery(queryRequest: AutoQueryCreatable) {
        const fieldMap = {
            state: 'state.name',
            stateDescription: 'state.description',
            stateType: 'state.stateType.name',
            stakeholderId: 'stakeholders.some.userId',
        };

        const model = this.queryCreator.createQueryModel(Request);
        return this.queryCreator.createQueryObject(model, queryRequest, { 
            fieldNameMap: {
                creatorId: 'userId'
            },
            fieldMap 
        });
    }
}