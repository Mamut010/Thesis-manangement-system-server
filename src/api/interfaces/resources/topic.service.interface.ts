import { TopicCreateRequest } from "../../../contracts/requests/resources/topic-create.request";
import { TopicUpdateRequest } from "../../../contracts/requests/resources/topic-update.request";
import { TopicsQueryRequest } from "../../../contracts/requests/resources/topics-query.request";
import { TopicsQueryResponse } from "../../../contracts/responses/resources/topics-query.response";
import { TopicDto } from "../../../shared/dtos";

export interface TopicServiceInterface {
    getTopics(queryRequest: TopicsQueryRequest) : Promise<TopicsQueryResponse>;
    getTopic(id: number): Promise<TopicDto>;
    createTopic(createRequest: TopicCreateRequest): Promise<TopicDto>;
    updateTopic(id: number, updateRequest: TopicUpdateRequest): Promise<TopicDto>;
    deleteTopic(id: number): Promise<void>;
}