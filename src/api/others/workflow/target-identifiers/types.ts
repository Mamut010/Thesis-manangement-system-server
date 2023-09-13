import { Target } from "../types/targets"
import { Stakeholder } from "../types/utility-types"

export type NameValuePair = {
    name: string,
    value: string,
}

export type TargetIdentifierInput = {
    creatorId: string,
    requestStakeholders: Stakeholder[],
    requestData: NameValuePair[],
}

export type TargetIdentifierOutput = {
    target: Target | undefined,
}