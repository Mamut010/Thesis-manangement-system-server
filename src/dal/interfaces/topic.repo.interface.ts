import { TopicCreateRequest, TopicUpdateRequest, TopicsQueryRequest } from "../../contracts/requests";
import { TopicsQueryResponse } from "../../contracts/responses";
import { TopicDto } from "../../shared/dtos";

export interface TopicRepoInterface {
    query(queryRequest: TopicsQueryRequest): Promise<TopicsQueryResponse>;

    findOneById(id: number): Promise<TopicDto | null>;

    create(createRequest: TopicCreateRequest): Promise<TopicDto>;

    update(id: number, updateRequest: TopicUpdateRequest): Promise<TopicDto | null>;

    delete(id: number): Promise<boolean>;
}