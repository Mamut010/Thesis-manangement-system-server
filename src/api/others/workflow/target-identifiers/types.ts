export type NameValuePair = {
    name: string,
    value: string,
}

export type TargetIdentifierInput = {
    creatorId: string,
    stakeholderIds: string[],
    requestData: NameValuePair[],
}