import { ActionType } from "./action-type";
import { StateType } from "./state-type";

export interface RequestUsersDto {
    requesterId: string,
    stakeholderIds: string[],
}

export interface RequestStateDto {
    id: string,
    processId: string,
    creatorId: string,
    stakeholderIds: string[],
    stateType: StateType,
    state: string,
    stateDescription: string | null,
    actionTypes: ActionType[],
}