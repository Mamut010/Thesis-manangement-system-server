import { inject, injectable, interfaces } from "inversify";
import { ActionHandlerInterface } from "../../action-handlers";
import { ActivityHandlerInterface } from "../../activity-handlers";
import { TargetIdentifierInterface } from "../../target-identifiers";
import { ActionType } from "../../types/action-type";
import { ActivityType } from "../../types/activity-type";
import { WorkflowCoreFactoryInterface } from "../interfaces/workflow-core-factory.interface";
import { INJECTION_TOKENS } from "../../../../../core/constants/injection-tokens";
import { TargetIdentifier } from "../../target-identifiers/identifiers/target-identifier";
import { ApplyThesisActionHandler } from "../../action-handlers/handlers/apply-thesis-action-handler";
import { ApproveActionHandler } from "../../action-handlers/handlers/approve-action-handler";
import { CancelActionHandler } from "../../action-handlers/handlers/cancel-action-handler";
import { ConfirmActionHandler } from "../../action-handlers/handlers/confirm-action-handler";
import { DenyActionHandler } from "../../action-handlers/handlers/deny-action-handler";
import { InformAdminGroupActionHandler } from "../../action-handlers/handlers/inform-admin-group-action-handler";
import { InformRequesterActionHandler } from "../../action-handlers/handlers/inform-requester-action-handler";
import { RejectActionHandler } from "../../action-handlers/handlers/reject-action-handler";
import { RequestAdminGroupActionHandler } from "../../action-handlers/handlers/request-admin-group-action-handler";
import { RequestSupervisor1ActionHandler } from "../../action-handlers/handlers/request-supervisor1-action-handler";
import { RequestSupervisor2ActionHandler } from "../../action-handlers/handlers/request-supervisor2-action-handler";
import { NotifyActivityHandler } from "../../activity-handlers/handlers/notify-activity-handler";
import { SendEmailActivityHandler } from "../../activity-handlers/handlers/send-email-activity-handler";
import { AddStakeholdersActivityHandler } from "../../activity-handlers/handlers/add-stakeholders-activity-handler";
import { RejectThesisActionHandler } from "../../action-handlers/handlers/reject-thesis-action-handler";

@injectable()
export class  WorkflowCoreFactory implements WorkflowCoreFactoryInterface {
    constructor(@inject(INJECTION_TOKENS.DIContainer) private container: interfaces.Container) {
        
    }

    createTargetIdentifier(): TargetIdentifierInterface {
        return this.container.get(TargetIdentifier);
    }
    
    createActionHandler(actionType: ActionType): ActionHandlerInterface | undefined {
        switch(actionType) {
            case ActionType.ApplyThesis: return this.container.get(ApplyThesisActionHandler);
            case ActionType.Approve: return this.container.get(ApproveActionHandler);
            case ActionType.Cancel: return this.container.get(CancelActionHandler);
            case ActionType.Confirm: return this.container.get(ConfirmActionHandler);
            case ActionType.Deny: return this.container.get(DenyActionHandler);
            case ActionType.InformAdminGroup: return this.container.get(InformAdminGroupActionHandler);
            case ActionType.InformRequester: return this.container.get(InformRequesterActionHandler);
            case ActionType.Reject: return this.container.get(RejectActionHandler);
            case ActionType.RejectThesis: return this.container.get(RejectThesisActionHandler);
            case ActionType.RequestAdminGroup: return this.container.get(RequestAdminGroupActionHandler);
            case ActionType.RequestSupervisor1: return this.container.get(RequestSupervisor1ActionHandler);
            case ActionType.RequestSupervisor2: return this.container.get(RequestSupervisor2ActionHandler);
        }
    }

    createActivityHandler(activityType: ActivityType): ActivityHandlerInterface | undefined {
        switch(activityType) {
            case ActivityType.Notify: return this.container.get(NotifyActivityHandler);
            case ActivityType.SendEmail: return this.container.get(SendEmailActivityHandler);
            case ActivityType.AddStakeholders: return this.container.get(AddStakeholdersActivityHandler);
        }
    }
}