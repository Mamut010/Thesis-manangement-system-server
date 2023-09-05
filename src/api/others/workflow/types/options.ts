import { ActionType } from "./action-type";

export interface RequestCreateOptions {
    processId: string,
    userId: string,
    title: string,
}

export interface RequestAdvanceOptions {
    actionerId: string,
    requestId: string,
    actionType: ActionType,
    data?: Record<string, unknown>,
}