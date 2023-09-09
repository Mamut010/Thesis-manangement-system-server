import { RequesstStakeholdersUpdateRequest, RequestsQueryRequest } from "../../contracts/requests";
import { RequestsQueryResponse } from "../../contracts/responses";
import { RequestDto } from "../../shared/dtos";

export interface RequestRepoInterface {
    query(queryRequest: RequestsQueryRequest): Promise<RequestsQueryResponse>;

    findOneById(id: string): Promise<RequestDto | null>;

    delete(id: string): Promise<boolean>;

    updateMembers(id: string, updateRequest: RequesstStakeholdersUpdateRequest): Promise<RequestDto | null>;

    setMembers(id: string, userIds: string[]): Promise<RequestDto | null>;
}