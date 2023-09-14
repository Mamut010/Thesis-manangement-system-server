import { ActivityType } from "./activity-type";
import { Target } from "./targets";
import { ActivityHandlerInput } from "../activity-handlers";
import { RequestDataRepoInterface } from "../../../../dal/interfaces";
import { WorkflowRequestDataProcessorInterface } from "../request-data-processor";

export type WorkflowInputData = Record<string, unknown>;

export type ActivityEffect = () => Promise<void>;

export interface ActivityTypeWithTarget {
    activityType: ActivityType,
    target: Target,
}

export type ActivityHandlerInputWithoutTarget = Omit<ActivityHandlerInput, 'target'>;

export interface UserStakeholder {
    userId: string,
    isAccepted: boolean,
}

export interface GroupStakeholder {
    groupId: string,
    memberIds: string[],
    isAccepted: boolean,
}

export interface RequestDataDeps {
    repo: RequestDataRepoInterface, 
    processor: WorkflowRequestDataProcessorInterface,
}

export interface KeyValuePair<T = unknown> {
    key: string,
    value: T,
} 