import { ActivityHandlerInput, ActivityHandlerOutput } from "../types";

export interface ActivityHandlerInterface {
    handle(requestId: string, activityInput: ActivityHandlerInput): Promise<ActivityHandlerOutput> | ActivityHandlerOutput;
}