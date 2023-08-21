import { TopicCreateRequest } from "../../contracts/requests/resources/topic-create.request";
import { TopicUpdateRequest } from "../../contracts/requests/resources/topic-update.request";
import { TopicsQueryRequest } from "../../contracts/requests/resources/topics-query.request";
import { TopicsQueryResponse } from "../../contracts/responses/resources/topics-query.response";
import { TopicDto } from "../../shared/dtos";

export interface TopicRepoInterface {
    query(queryRequest: TopicsQueryRequest): Promise<TopicsQueryResponse>;

    findOneById(id: number): Promise<TopicDto | null>;

    create(createRequest: TopicCreateRequest): Promise<TopicDto>;

    update(id: number, updateRequest: TopicUpdateRequest): Promise<TopicDto | null>;

    delete(id: number): Promise<boolean>;
}