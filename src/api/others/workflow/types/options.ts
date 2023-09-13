import { ActionType } from "./action-type";
import { WorkflowInputData } from "./utility-types";

export interface RequestCreateOptions {
    processId: string,
    userId: string,
    title: string,
}

export interface RequestAdvanceOptions {
    actionerId: string,
    requestId: string,
    actionType: ActionType,
    data?: WorkflowInputData,
}