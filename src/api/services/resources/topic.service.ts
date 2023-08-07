import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { TopicServiceInterface } from "../../interfaces";
import { TopicsQueryRequest } from "../../../contracts/requests/resources/topics-query.request";
import { TopicsQueryResponse } from "../../../contracts/responses/resources/topics-query.response";
import { PrismaQueryCreatorInterface } from "../../../lib/query";
import { TopicDto } from "../../../shared/dtos";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../contracts/constants/error-messages";
import { TopicCreateRequest } from "../../../contracts/requests/resources/topic-create.request";
import { TopicUpdateRequest } from "../../../contracts/requests/resources/topic-update.request";
import { Topic } from "../../../core/models";
import { PlainTransformerInterface } from "../../utils/plain-transformer";
import { compareObjectByEntries, isObjectEmptyOrAllUndefined } from "../../../utils/object-helpers";

@injectable()
export class TopicService implements TopicServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface
    ) {

    }

    async getTopics(queryRequest: TopicsQueryRequest): Promise<TopicsQueryResponse> {
        const model = this.queryCreator.createQueryModel(Topic);
        const prismaQuery = this.queryCreator.createQueryObject(model, queryRequest);

        const count = await this.prisma.topic.count({ ...prismaQuery, skip: undefined, take: undefined });
        const topics = await this.prisma.topic.findMany(prismaQuery);

        const response = new TopicsQueryResponse();
        response.content = topics.map(item => this.plainTransformer.toTopic(item));
        response.count = count;
        return response;
    }

    async getTopic(id: number): Promise<TopicDto> {
        const topic = await this.ensureRecordExists(id);
        return this.plainTransformer.toTopic(topic);
    }

    async createTopic(createRequest: TopicCreateRequest): Promise<TopicDto> {
        const topic = await this.prisma.topic.create({
            data: createRequest
        });
        return this.plainTransformer.toTopic(topic);
    }

    async updateTopic(id: number, updateRequest: TopicUpdateRequest): Promise<TopicDto> {
        let record = await this.ensureRecordExists(id);
        if (!isObjectEmptyOrAllUndefined(updateRequest) && !compareObjectByEntries(record, updateRequest)) {
            record = await this.prisma.topic.update({
                where: {
                    id: id
                },
                data: updateRequest
            });
        }

        return this.plainTransformer.toTopic(record);
    }

    async deleteTopic(id: number): Promise<void> {
        await this.ensureRecordExists(id);

        await this.prisma.topic.delete({
            where: {
                id: id
            }
        });
    }

    private async ensureRecordExists(id: number) {
        try {
            return await this.prisma.topic.findUniqueOrThrow({
                where: {
                    id: id
            }});
        }
        catch {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.TopicNotFound);
        }
    }
}