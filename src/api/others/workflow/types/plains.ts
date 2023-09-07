import { ActionType } from "./action-type"

export type PlainRequestAction = Record<string, unknown> & {
    id: string,
    transitionId: string,
    nextStateId: string,
    action: {
        actionType: ActionType,
        actionTargets: { target: string }[],
    }
}

export type PlainRequestData = {
    name: string,
    value: string,
};