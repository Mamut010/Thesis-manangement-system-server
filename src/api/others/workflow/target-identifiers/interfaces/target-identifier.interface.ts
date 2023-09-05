import { TargetIdentifierInput } from "../types";
import { Target } from "../../types/targets";

export interface TargetIdentifierInterface {
    identifyTarget(actionerId: string, targetIdentifierInput: TargetIdentifierInput)
        : Promise<Target | undefined> | Target | undefined;
}