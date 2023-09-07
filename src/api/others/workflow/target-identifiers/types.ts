import { PlainRequestData } from "../types/plains";

export type TargetIdentifierInput = {
    creatorId: string,
    stakeholderIds: string[],
    requestData: PlainRequestData[],
}