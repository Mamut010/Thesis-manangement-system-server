import { inject, injectable } from "inversify";
import { ThesisRepoInterface } from "../interfaces";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { PlainTransformerInterface } from "../utils/plain-transfomer";
import { AutoQueryCreatable, PrismaQueryCreatorInterface } from "../../lib/query";
import { ThesesQueryRequest, ThesisCreateRequest, ThesisUpdateRequest } from "../../contracts/requests";
import { ThesesQueryResponse } from "../../contracts/responses";
import { Thesis } from "../../core/models";
import { ThesisDto } from "../../shared/dtos";
import { anyChanges } from "../utils/crud-helpers";
import { thesisInclude } from "../constants/includes";

@injectable()
export class ThesisRepo implements ThesisRepoInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface
    ) {

    }

    async query(queryRequest: ThesesQueryRequest): Promise<ThesesQueryResponse> {
        const prismaQuery = this.createPrismaQuery(queryRequest);

        const count = await this.prisma.thesis.count({ where: prismaQuery.where });
        const theses = await this.prisma.thesis.findMany({
            ...prismaQuery,
            include:  thesisInclude,
        });

        const response = new ThesesQueryResponse();
        response.content = theses.map(item => this.plainTransformer.toThesis(item));
        response.count = count;
        return response;
    }

    async findOneById(id: number): Promise<ThesisDto | null> {
        const record = await this.findRecordById(id);
        if (!record) {
            return null;
        }
        return this.plainTransformer.toThesis(record);
    }

    async create(createRequest: ThesisCreateRequest): Promise<ThesisDto> {
        const record = await this.prisma.thesis.create({
            data: createRequest,
            include: thesisInclude
        });
        return this.plainTransformer.toThesis(record);
    }

    async update(id: number, updateRequest: ThesisUpdateRequest): Promise<ThesisDto | null> {
        let record = await this.findRecordById(id);
        if (!record) {
            return null;
        }

        if (anyChanges(record, updateRequest)) {
            record = await this.prisma.thesis.update({
                where: {
                    id: id
                },
                data: updateRequest,
                include: thesisInclude
            });
        }

        return this.plainTransformer.toThesis(record);
    }

    async delete(id: number): Promise<boolean> {
        const { count } = await this.prisma.thesis.deleteMany({
            where: {
                id: id
            }
        });
        return count > 0;
    }

    private async findRecordById(id: number) {
        return await this.prisma.thesis.findUnique({
            where: {
                id: id
            },
            include: thesisInclude
        });
    }

    private createPrismaQuery(queryRequest: AutoQueryCreatable) {
        const fieldMap = {
            topicTitle: 'topic.title',
            fieldTitle: 'field.title',
        };
        const model = this.queryCreator.createQueryModel(Thesis);
        return this.queryCreator.createQueryObject(model, queryRequest, { fieldMap, fieldNameMap: {
            thesisId: 'id'
        }});
    }
}