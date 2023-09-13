import { IsArray, NotArray, ValueOf } from "../../utils/types";

export interface RequestIdAndName {
    requestId: string,
    name: string,
}

export interface NameValuePair {
    name: string,
    value: string,
}

export const RequestStakeholderKey = ['userId', 'groupId'] as const;
export type RequestStakeholderKey = ValueOf<typeof RequestStakeholderKey>;