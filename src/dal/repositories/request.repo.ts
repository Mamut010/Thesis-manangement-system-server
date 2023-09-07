import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { PlainTransformerInterface } from "../utils/plain-transfomer";
import { RequestsQueryRequest } from "../../contracts/requests";
import { RequestRepoInterface } from "../interfaces/request.repo.interface";
import { RequestsQueryResponse } from "../../contracts/responses";
import { RequestDto } from "../../shared/dtos";
import { AutoQueryCreatable, PrismaQuery, PrismaQueryCreatorInterface } from "../../lib/query";
import { Request } from "../../core/models";
import { requestInclude } from "../constants/includes";

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

    private async findRecordById(id: string) {
        return await this.prisma.request.findUnique({
            where: {
                id: id,
            },
            include: requestInclude
        });
    }

    private createPrismaQuery(queryRequest: RequestsQueryRequest): PrismaQuery {
        const fieldMap = {
            state: 'state.name',
            stateDescription: 'state.description',
            stateType: 'state.stateType.name',
        };

        const model = this.queryCreator.createQueryModel(Request);
        const queryObject = this.queryCreator.createQueryObject(model, queryRequest, { 
            fieldNameMap: {
                creatorId: 'userId'
            },
            fieldMap 
        });

        if (queryRequest.stakeholderIdFilter) {
            const stakeholderIdQuery: object = {
                OR: queryRequest.stakeholderIdFilter.map(filter => {
                    return { userId: this.queryCreator.createFilteringObject(filter)! }
                })
            };

            queryObject.where = {
                ...queryObject.where,
                ...stakeholderIdQuery,
            }
        }

        return queryObject
    }
}