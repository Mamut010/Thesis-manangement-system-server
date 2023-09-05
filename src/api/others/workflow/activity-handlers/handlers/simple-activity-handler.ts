import { ActivityHandlerInterface } from "../interfaces/activity-handler.interface";
import { ActivityHandlerInput, ActivityHandlerOutput } from "../types";

export class SimpleActivityHandler implements ActivityHandlerInterface {
    handle(requestId: string, activityInput: ActivityHandlerInput): ActivityHandlerOutput {
        return { requestUsersInfo: activityInput.requestUsersInfo };
    }
}