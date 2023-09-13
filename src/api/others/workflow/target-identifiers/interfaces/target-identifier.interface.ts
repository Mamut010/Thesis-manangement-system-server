import { TargetIdentifierInput, TargetIdentifierOutput } from "../types";

export interface TargetIdentifierInterface {
    identifyTarget(actionerId: string, targetIdentifierInput: TargetIdentifierInput)
        : Promise<TargetIdentifierOutput> | TargetIdentifierOutput;
}