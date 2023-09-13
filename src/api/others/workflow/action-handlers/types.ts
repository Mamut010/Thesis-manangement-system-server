import { RequestUsersDto } from "../types/dtos"
import { Target } from "../types/targets"
import { WorkflowInputData } from "../types/utility-types"

export interface ActionHandlerInput {
    requestUsers: RequestUsersDto,
    actionerId: string,
    target: Target,
    data?: WorkflowInputData,
}

export interface ActionHandlerOutput {
    requestUsers: RequestUsersDto,
    resolvedUserIds?: string[],
}