import { injectable } from "inversify";
import { ActivityHandlerInterface } from "../interfaces/activity-handler.interface";
import { ActivityHandlerInput, ActivityHandlerOutput } from "../types";

@injectable()
export class SimpleActivityHandler implements ActivityHandlerInterface {
    handle(requestId: string, activityInput: ActivityHandlerInput): ActivityHandlerOutput {
        return { requestUsers: activityInput.requestUsers };
    }
}