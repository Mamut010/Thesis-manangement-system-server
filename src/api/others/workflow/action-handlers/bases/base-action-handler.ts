import { ActionHandlerInput, ActionHandlerOutput } from "../types";
import { ActionHandlerInterface } from "../interfaces/action-handler.interface";
import { UnexpectedError } from "../../../../../contracts/errors/unexpected.error";
import { injectable } from "inversify";

@injectable()
export abstract class BaseActionHandler implements ActionHandlerInterface {
    abstract handle(requestId: string, actionInput: ActionHandlerInput): ActionHandlerOutput | Promise<ActionHandlerOutput>;

    protected getInputDataStringValue(actionInput: ActionHandlerInput, key: string): string {
        const value = actionInput.data?.[key];
        if (typeof value !== 'string') {
            throw new UnexpectedError(`Missing property ${key} of type string in actionInput's data`);
        }
        return value;
    }
}