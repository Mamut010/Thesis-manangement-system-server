import { ActionHandlerInput, ActionHandlerOutput } from "../types";
import { ActionHandlerInterface } from "../interfaces/action-handler.interface";
import { injectable } from "inversify";

@injectable()
export class SimpleActionHandler implements ActionHandlerInterface {
    handle(requestId: string, actionInput: ActionHandlerInput): ActionHandlerOutput {
        // Simple actions are actions that don't need to do any thing
        return {
            requestUsers: actionInput.requestUsers,
            resolvedUserIds: [actionInput.actionerId],
        };
    }
}