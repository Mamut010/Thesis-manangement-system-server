import { RequestUsersDto } from "../types/dtos"
import { Target } from "../types/targets"

export interface ActionHandlerInput {
    requestUsers: RequestUsersDto,
    actionerId: string,
    target: Target,
    data?: Record<string, unknown>,
}

export interface ActionHandlerOutput {
    requestUsers: RequestUsersDto,
    resolvedUserIds?: string[],
}