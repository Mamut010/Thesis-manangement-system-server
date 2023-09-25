import { BaseQueryRequest } from "../contracts/bases";
import { SimpleQueryRequest } from "../contracts/requests";

export function queryRequestOrDefault<T extends BaseQueryRequest>(queryRequest: T | undefined): BaseQueryRequest {
    return queryRequest ?? new SimpleQueryRequest();
}