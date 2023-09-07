import { RequestUsersDto } from "../types/dtos";
import { Target } from "../types/targets";

export interface ActivityHandlerInput {
    requestUsers: RequestUsersDto,
    actionerId?: string,
    target: Target,
    actionResolvedUserIds?: string[],
}

export interface ActivityHandlerOutput {
    requestUsers: RequestUsersDto,
    resolvedUserIds?: string[],
}