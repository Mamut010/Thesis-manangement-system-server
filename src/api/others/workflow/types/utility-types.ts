import { PrismaClient } from "@prisma/client";
import * as runtime from '@prisma/client/runtime/library';
import { ActivityType } from "./activity-type";
import { Target } from "./targets";
import { ActivityHandlerInput } from "../activity-handlers";

export type PrismaClientLike = Omit<PrismaClient, runtime.ITXClientDenyList>;

export type ActivityEffect = () => Promise<void>;

export interface ActivityTypeWithTarget {
    activityType: ActivityType,
    target: Target,
}

export type ActivityHandlerInputWithoutTarget = Omit<ActivityHandlerInput, 'target'>;