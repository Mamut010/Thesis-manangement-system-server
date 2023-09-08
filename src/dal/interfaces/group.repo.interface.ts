import { GroupCreateRequest, GroupUpdateRequest, GroupsQueryRequest } from "../../contracts/requests";
import { GroupsQueryResponse } from "../../contracts/responses";
import { GroupDto } from "../../shared/dtos";

export interface GroupRepoInterface {
    query(queryRequest: GroupsQueryRequest): Promise<GroupsQueryResponse>;

    findOneById(id: string): Promise<GroupDto | null>;

    create(createRequest: GroupCreateRequest): Promise<GroupDto>;

    update(id: string, updateRequest: GroupUpdateRequest): Promise<GroupDto | null>;

    delete(id: string): Promise<boolean>;
}