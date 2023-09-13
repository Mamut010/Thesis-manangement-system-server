import { RequestGroupStakeholdersUpdateRequest, RequestUserStakeholdersUpdateRequest } from "../../contracts/requests";
import { RequestStakeholderDto } from "../../shared/dtos";

export interface RequestStakeholderRepoInterface {
    getStakeholders(requestId: string): Promise<RequestStakeholderDto | null>;

    updateUserStakeholders(requestId: string, updateRequest: RequestUserStakeholdersUpdateRequest)
        : Promise<RequestStakeholderDto | null>;

    updateGroupStakeholders(requestId: string, updateRequest: RequestGroupStakeholdersUpdateRequest)
        : Promise<RequestStakeholderDto | null>;

    setStakeholdersAccepted(requestId: string, id: string | string[], accepted: boolean)
        : Promise<RequestStakeholderDto | null>;

    setUserStakeholderAccepted(requestId: string, userId: string | string[], accepted: boolean)
        : Promise<RequestStakeholderDto | null>;

    setGroupStakeholderAccepted(requestId: string, groupId: string | string[], accepted: boolean)
        : Promise<RequestStakeholderDto | null>;
}