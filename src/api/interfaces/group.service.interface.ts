import { GroupInfoCreateRequest, GroupInfoUpdateRequest, GroupInfosQueryRequest } from "../../contracts/requests";
import { GroupInfosQueryResponse } from "../../contracts/responses";
import { GroupInfoDto } from "../../shared/dtos";

export interface GroupServiceInterface {
    getGroups(queryRequest: GroupInfosQueryRequest) : Promise<GroupInfosQueryResponse>;
    getGroup(id: string): Promise<GroupInfoDto>;
    createThesisProcessGroup(createRequest: GroupInfoCreateRequest): Promise<GroupInfoDto>;
    updateGroup(id: string, updateRequest: GroupInfoUpdateRequest): Promise<GroupInfoDto>;
    deleteGroup(id: string): Promise<void>;
}