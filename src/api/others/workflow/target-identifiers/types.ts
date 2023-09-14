import { RequestUsersDto } from "../types/dtos"
import { Target } from "../types/targets"

export type NameValuePair = {
    name: string,
    value: string,
}

export type TargetIdentifierInput = {
    requestUsers: RequestUsersDto,
    requestData: NameValuePair[],
}

export type TargetIdentifierOutput = {
    target: Target | undefined,
}