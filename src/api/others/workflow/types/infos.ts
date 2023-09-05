import { ActionType } from "./action-type";
import { StateType } from "./state-type";

export interface RequestUsersInfo {
    requesterId: string,
    stakeholderIds: string[],
}

export interface RequestInfo {
    id: string,
    stateType: StateType,
    state: string,
    stateDescription?: string,
    actionTypes: ActionType[],
}