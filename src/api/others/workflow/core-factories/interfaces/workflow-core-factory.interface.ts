import { ActionHandlerInterface } from "../../action-handlers";
import { ActivityHandlerInterface } from "../../activity-handlers";
import { TargetIdentifierInterface } from "../../target-identifiers";
import { ActionType } from "../../types/action-type";
import { ActivityType } from "../../types/activity-type";

export interface WorkflowCoreFactoryInterface {
    createTargetIdentifier(): TargetIdentifierInterface;
    createActionHandler(actionType: ActionType): ActionHandlerInterface | undefined;
    createActivityHandler(activityType: ActivityType): ActivityHandlerInterface | undefined;
}