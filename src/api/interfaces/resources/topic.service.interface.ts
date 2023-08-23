import { TopicCreateRequest, TopicUpdateRequest, TopicsQueryRequest } from "../../../contracts/requests";
import { TopicsQueryResponse } from "../../../contracts/responses";
import { TopicDto } from "../../../shared/dtos";

export interface TopicServiceInterface {
    getTopics(queryRequest: TopicsQueryRequest) : Promise<TopicsQueryResponse>;
    getTopic(id: number): Promise<TopicDto>;
    createTopic(createRequest: TopicCreateRequest): Promise<TopicDto>;
    updateTopic(id: number, updateRequest: TopicUpdateRequest): Promise<TopicDto>;
    deleteTopic(id: number): Promise<void>;
}