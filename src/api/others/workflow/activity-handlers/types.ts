import { RequestUsersInfo } from "../types/infos";
import { Target } from "../types/targets";

export interface ActivityHandlerInput {
    requestUsersInfo: RequestUsersInfo,
    actionerId?: string,
    target: Target,
    actionResolvedUserIds?: string[],
}

export interface ActivityHandlerOutput {
    requestUsersInfo: RequestUsersInfo,
    resolvedUserIds?: string[],
}