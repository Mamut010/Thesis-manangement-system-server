import { ActionHandlerInput, ActionHandlerOutput } from "../types";
import { injectable } from "inversify";
import { BaseActionHandler } from "../bases/base-action-handler";

export class SimpleActionHandler extends BaseActionHandler {
    handle(requestId: string, actionInput: ActionHandlerInput): ActionHandlerOutput {
        // Simple actions are actions that don't need to do any thing
        return {
            requestUsers: actionInput.requestUsers,
            resolvedUserIds: [actionInput.actionerId],
        };
    }
}