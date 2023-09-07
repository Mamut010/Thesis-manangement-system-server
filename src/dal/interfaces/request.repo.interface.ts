import { RequestsQueryRequest } from "../../contracts/requests";
import { RequestsQueryResponse } from "../../contracts/responses";
import { RequestDto } from "../../shared/dtos";

export interface RequestRepoInterface {
    query(queryRequest: RequestsQueryRequest): Promise<RequestsQueryResponse>;

    findOneById(id: string): Promise<RequestDto | null>;

    delete(id: string): Promise<boolean>;
}