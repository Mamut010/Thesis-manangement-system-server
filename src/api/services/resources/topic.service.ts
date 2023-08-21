import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { TopicServiceInterface } from "../../interfaces";
import { TopicsQueryRequest } from "../../../contracts/requests/resources/topics-query.request";
import { TopicsQueryResponse } from "../../../contracts/responses/resources/topics-query.response";
import { TopicDto } from "../../../shared/dtos";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../contracts/constants/error-messages";
import { TopicCreateRequest } from "../../../contracts/requests/resources/topic-create.request";
import { TopicUpdateRequest } from "../../../contracts/requests/resources/topic-update.request";
import { TopicRepoInterface } from "../../../dal/interfaces";

@injectable()
export class TopicService implements TopicServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.TopicRepo) private topicRepo: TopicRepoInterface) {

    }

    async getTopics(queryRequest: TopicsQueryRequest): Promise<TopicsQueryResponse> {
        return await this.topicRepo.query(queryRequest);
    }

    async getTopic(id: number): Promise<TopicDto> {
        return await this.ensureRecordExists(id);
    }

    async createTopic(createRequest: TopicCreateRequest): Promise<TopicDto> {
        return await this.topicRepo.create(createRequest);
    }

    async updateTopic(id: number, updateRequest: TopicUpdateRequest): Promise<TopicDto> {
        const record = await this.topicRepo.update(id, updateRequest);
        if (!record) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.TopicNotFound);
        }

        return record;
    }

    async deleteTopic(id: number): Promise<void> {
        await this.topicRepo.delete(id);
    }

    private async ensureRecordExists(id: number) {
        const result = await this.topicRepo.findOneById(id);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.TopicNotFound);
        }
        return result;
    }
}