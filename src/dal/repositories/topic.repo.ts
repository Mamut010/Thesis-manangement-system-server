import { inject, injectable } from "inversify";
import { TopicRepoInterface } from "../interfaces";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { PlainTransformerInterface } from "../../shared/utils/plain-transformer";
import { AutoQueryCreatable, PrismaQueryCreatorInterface } from "../../lib/query";
import { TopicsQueryRequest } from "../../contracts/requests/resources/topics-query.request";
import { TopicsQueryResponse } from "../../contracts/responses/resources/topics-query.response";
import { Topic } from "../../core/models";
import { TopicDto } from "../../shared/dtos";
import { TopicCreateRequest } from "../../contracts/requests/resources/topic-create.request";
import { TopicUpdateRequest } from "../../contracts/requests/resources/topic-update.request";
import { anyChanges } from "../utils/crud-helpers";

@injectable()
export class TopicRepo implements TopicRepoInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface
    ) {

    }

    async query(queryRequest: TopicsQueryRequest): Promise<TopicsQueryResponse> {
        const prismaQuery = this.createPrismaQuery(queryRequest);

        const count = await this.prisma.topic.count({ where: prismaQuery.where });
        const topics = await this.prisma.topic.findMany(prismaQuery);

        const response = new TopicsQueryResponse();
        response.content = topics.map(item => this.plainTransformer.toTopic(item));
        response.count = count;
        return response;
    }

    async findOneById(id: number): Promise<TopicDto | null> {
        const record = await this.findRecordById(id);
        if (!record) {
            return null;
        }
        return this.plainTransformer.toTopic(record);
    }

    async create(createRequest: TopicCreateRequest): Promise<TopicDto> {
        const record = await this.prisma.topic.create({
            data: createRequest
        });
        return this.plainTransformer.toTopic(record);
    }

    async update(id: number, updateRequest: TopicUpdateRequest): Promise<TopicDto | null> {
        let record = await this.findRecordById(id);
        if (!record) {
            return null;
        }

        if (anyChanges(record, updateRequest)) {
            record = await this.prisma.topic.update({
                where: {
                    id: id
                },
                data: updateRequest
            });
        }

        return this.plainTransformer.toTopic(record);
    }

    async delete(id: number): Promise<boolean> {
        const { count } = await this.prisma.topic.deleteMany({
            where: {
                id: id
            }
        });
        return count > 0;
    }

    private async findRecordById(id: number) {
        return await this.prisma.topic.findUnique({
            where: {
                id: id
            },
        });
    }

    private createPrismaQuery(queryRequest: AutoQueryCreatable) {
        const model = this.queryCreator.createQueryModel(Topic);
        return this.queryCreator.createQueryObject(model, queryRequest);
    }
}