import { ActionHandlerInput, ActionHandlerOutput } from "../types";
import { ActionHandlerInterface } from "../interfaces/action-handler.interface";
import { BadRequestError } from "../../../../../contracts/errors/bad-request.error";

export abstract class BaseActionHandler implements ActionHandlerInterface {
    abstract handle(requestId: string, actionInput: ActionHandlerInput): ActionHandlerOutput | Promise<ActionHandlerOutput>;

    protected getInputDataStringValue(actionInput: ActionHandlerInput, key: string): string {
        const value = actionInput.data?.[key];
        if (typeof value !== 'string') {
            throw new BadRequestError(`Missing property ${key} of type string in request data`);
        }
        return value;
    }

    protected defaultOutput(actionInput: ActionHandlerInput): ActionHandlerOutput {
        return { requestUsers: actionInput.requestUsers };
    } 
}