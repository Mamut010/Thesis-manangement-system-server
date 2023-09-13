import { ActionType } from "./action-type";
import { StateType } from "./state-type";
import { Stakeholder } from "./utility-types";

export interface RequestUsersDto {
    requesterId: string,
    requestStakeholders: Stakeholder[],
}

export interface RequestStateDto {
    id: string,
    processId: string,
    stateType: StateType,
    state: string,
    stateDescription: string | null,
    actionTypes: ActionType[],
}