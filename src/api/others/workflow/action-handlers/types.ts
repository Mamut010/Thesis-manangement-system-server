import { RequestUsersInfo } from "../types/infos"
import { Target } from "../types/targets"

export interface ActionHandlerInput {
    requestUsersInfo: RequestUsersInfo,
    actionerId: string,
    target: Target,
    data?: Record<string, unknown>,
}

export interface ActionHandlerOutput {
    requestUsersInfo: RequestUsersInfo,
    resolvedUserIds?: string[],
}