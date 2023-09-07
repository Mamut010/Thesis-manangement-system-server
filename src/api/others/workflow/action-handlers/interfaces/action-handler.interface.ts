import { ActionHandlerInput, ActionHandlerOutput } from './../types';

export interface ActionHandlerInterface {
    handle(requestId: string, actionInput: ActionHandlerInput): Promise<ActionHandlerOutput> | ActionHandlerOutput;
}