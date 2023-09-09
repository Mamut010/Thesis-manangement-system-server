import { 
    GroupInfoCreateRequest, 
    GroupInfoUpdateRequest, 
    GroupInfosQueryRequest,
    GroupMembersUpdateRequest 
} from "../../contracts/requests";
import { GroupInfosQueryResponse } from "../../contracts/responses";
import { GroupInfoDto } from "../../shared/dtos";

export interface GroupServiceInterface {
    getGroups(queryRequest: GroupInfosQueryRequest) : Promise<GroupInfosQueryResponse>;
    getGroup(id: string): Promise<GroupInfoDto>;
    updateGroup(id: string, updateRequest: GroupInfoUpdateRequest): Promise<GroupInfoDto>;
    deleteGroup(id: string): Promise<void>;
    createThesisProcessGroup(createRequest: GroupInfoCreateRequest): Promise<GroupInfoDto>;
    updateGroupMembers(id: string, updateRequest: GroupMembersUpdateRequest): Promise<GroupInfoDto>;
    setGroupMembers(id: string, userIds: string[]): Promise<GroupInfoDto>;
}