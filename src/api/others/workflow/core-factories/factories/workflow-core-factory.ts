import { interfaces } from "inversify";
import { 
    ActionHandlerInterface, 
    ApplyThesisActionHandler, 
    ApproveActionHandler, 
    ApproveBTEActionHandler, 
    ApproveBTRActionHandler, 
    ApprovePermissionBTRActionHandler, 
    ApprovePermissionODRActionHandler, 
    BackActionHandler, 
    BackAssessmentsActionHandler, 
    BackBTRActionHandler, 
    BackODRActionHandler, 
    CancelActionHandler, 
    ConfirmActionHandler, 
    ConfirmAssessmentsActionHandler, 
    ConfirmBTRActionHandler, 
    ConfirmODRActionHandler, 
    ConfirmThesisActionHandler, 
    DenyActionHandler, 
    InformAdminGroupActionHandler, 
    InformRequesterActionHandler, 
    InviteSupervisor2ActionHandler, 
    RejectActionHandler,
    RejectBTRActionHandler,
    RejectThesisActionHandler,
    RequestAdminGroupActionHandler,
    RequestSupervisor1ActionHandler,
    RequestSupervisor2ActionHandler,
    RequestSupervisorsActionHandler
} from "../../action-handlers";
import { 
    AcceptStakeholdersActivityHandler, 
    ActivityHandlerInterface, 
    AddStakeholdersActivityHandler, 
    NotifyActivityHandler, 
    RemoveStakeholdersActivityHandler, 
    SendEmailActivityHandler
} from "../../activity-handlers";
import { TargetIdentifierInterface, TargetIdentifier } from "../../target-identifiers";
import { ActionType } from "../../types/action-type";
import { ActivityType } from "../../types/activity-type";
import { WorkflowCoreFactoryInterface } from "../interfaces/workflow-core-factory.interface";

export class  WorkflowCoreFactory implements WorkflowCoreFactoryInterface {
    constructor(private container: interfaces.Container) {
        
    }

    createTargetIdentifier(): TargetIdentifierInterface {
        return this.container.get(TargetIdentifier);
    }
    
    createActionHandler(actionType: ActionType): ActionHandlerInterface | undefined {
        switch(actionType) {
            case ActionType.ApplyThesis: return this.container.get(ApplyThesisActionHandler);
            case ActionType.Approve: return this.container.get(ApproveActionHandler);
            case ActionType.Back: return this.container.get(BackActionHandler);
            case ActionType.Cancel: return this.container.get(CancelActionHandler);
            case ActionType.Confirm: return this.container.get(ConfirmActionHandler);
            case ActionType.ConfirmThesis: return this.container.get(ConfirmThesisActionHandler);
            case ActionType.Deny: return this.container.get(DenyActionHandler);
            case ActionType.InformAdminGroup: return this.container.get(InformAdminGroupActionHandler);
            case ActionType.InformRequester: return this.container.get(InformRequesterActionHandler);
            case ActionType.InviteSupervisor2: return this.container.get(InviteSupervisor2ActionHandler);
            case ActionType.Reject: return this.container.get(RejectActionHandler);
            case ActionType.RejectThesis: return this.container.get(RejectThesisActionHandler);
            case ActionType.RequestAdminGroup: return this.container.get(RequestAdminGroupActionHandler);
            case ActionType.RequestSupervisor1: return this.container.get(RequestSupervisor1ActionHandler);
            case ActionType.RequestSupervisor2: return this.container.get(RequestSupervisor2ActionHandler);
            case ActionType.RequestSupervisors: return this.container.get(RequestSupervisorsActionHandler);
            case ActionType.ApproveBachelorThesisEvaluation: return this.container.get(ApproveBTEActionHandler);
            case ActionType.ApproveBachelorThesisRegistration: return this.container.get(ApproveBTRActionHandler);
            case ActionType.ApprovePermissionBachelorThesisRegistration: return this.container.get(ApprovePermissionBTRActionHandler);
            case ActionType.ApprovePermissionOralDefenseRegistration: return this.container.get(ApprovePermissionODRActionHandler);
            case ActionType.BackAssessments: return this.container.get(BackAssessmentsActionHandler);
            case ActionType.BackBachelorThesisRegistration: return this.container.get(BackBTRActionHandler);
            case ActionType.BackOralDefenseRegistration: return this.container.get(BackODRActionHandler);
            case ActionType.ConfirmAssessments: return this.container.get(ConfirmAssessmentsActionHandler);
            case ActionType.ConfirmBachelorThesisRegistration: return this.container.get(ConfirmBTRActionHandler);
            case ActionType.ConfirmOralDefenseRegistration: return this.container.get(ConfirmODRActionHandler);
            case ActionType.RejectBachelorThesisRegistration: return this.container.get(RejectBTRActionHandler);
        }
    }

    createActivityHandler(activityType: ActivityType): ActivityHandlerInterface | undefined {
        switch(activityType) {
            case ActivityType.Notify: return this.container.get(NotifyActivityHandler);
            case ActivityType.SendEmail: return this.container.get(SendEmailActivityHandler);
            case ActivityType.AddStakeholders: return this.container.get(AddStakeholdersActivityHandler);
            case ActivityType.RemoveStakeholders: return this.container.get(RemoveStakeholdersActivityHandler);
            case ActivityType.AcceptStakeholders: return this.container.get(AcceptStakeholdersActivityHandler);
        }
    }
}