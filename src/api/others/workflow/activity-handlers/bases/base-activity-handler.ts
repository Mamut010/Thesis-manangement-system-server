import { ActivityHandlerInterface } from "../interfaces/activity-handler.interface";
import { ActivityHandlerInput, ActivityHandlerOutput } from "../types";

export abstract class BaseActivityHandler implements ActivityHandlerInterface {
    abstract handle(requestId: string, activityInput: ActivityHandlerInput)
        : Promise<ActivityHandlerOutput> | ActivityHandlerOutput;

    protected defaultOutput(activityInput: ActivityHandlerInput): ActivityHandlerOutput {
        return { requestUsers: activityInput.requestUsers };
    } 
}