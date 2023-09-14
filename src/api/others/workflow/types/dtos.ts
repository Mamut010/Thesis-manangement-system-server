import { ActionType } from "./action-type";
import { StateType } from "./state-type";
import { GroupStakeholder, UserStakeholder } from "./utility-types";

export interface RequestUsersDto {
    requesterId: string,
    userStakeholders: UserStakeholder[],
    groupStakeholders: GroupStakeholder[],
}

export interface RequestStateDto {
    id: string,
    processId: string,
    stateType: StateType,
    state: string,
    stateDescription: string | null,
    actionTypes: ActionType[],
}