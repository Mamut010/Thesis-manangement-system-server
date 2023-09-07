import { inject, injectable } from "inversify";
import { ActionHandlerInterface } from "../../action-handlers";
import { ActivityHandlerInterface } from "../../activity-handlers";
import { TargetIdentifierInterface } from "../../target-identifiers";
import { ActionType } from "../../types/action-type";
import { ActivityType } from "../../types/activity-type";
import { WorkflowCoreFactoryInterface } from "../interfaces/workflow-core-factory.interface";
import { INJECTION_TOKENS } from "../../../../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { CryptoServiceInterface, MailServiceInterface, NotificationServiceInterface } from "../../../../../shared/interfaces";
import { TargetIdentifier } from "../../target-identifiers/identifiers/target-identifier";
import { ApplyThesisActionHandler } from "../../action-handlers/handlers/apply-thesis-action-handler";
import { ApproveActionHandler } from "../../action-handlers/handlers/approve-action-handler";
import { CancelActionHandler } from "../../action-handlers/handlers/cancel-action-handler";
import { ConfirmActionHandler } from "../../action-handlers/handlers/confirm-action-handler";
import { DenyActionHandler } from "../../action-handlers/handlers/deny-action-handler";
import { InformAdminActionHandler } from "../../action-handlers/handlers/inform-admin-action-handler";
import { InformRequesterActionHandler } from "../../action-handlers/handlers/inform-requester-action-handler";
import { RejectActionHandler } from "../../action-handlers/handlers/reject-action-handler";
import { RequestAdminActionHandler } from "../../action-handlers/handlers/request-admin-action-handler";
import { RequestSupervisor1ActionHandler } from "../../action-handlers/handlers/request-supervisor1-action-type";
import { RequestSupervisor2ActionHandler } from "../../action-handlers/handlers/request-supervisor2-action-handler";
import { SimpleActionHandler } from "../../action-handlers/handlers/simple-action-handler";
import { NotifyActivityHandler } from "../../activity-handlers/handlers/notify-activity-handler";
import { SendEmailActivityHandler } from "../../activity-handlers/handlers/send-email-activity-handler";
import { AddStakeholdersActivityHandler } from "../../activity-handlers/handlers/add-stakeholders-activity-handler";
import { SimpleActivityHandler } from "../../activity-handlers/handlers/simple-activity-handler";

@injectable()
export class  WorkflowCoreFactory implements WorkflowCoreFactoryInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.NotificationService) private notificationService: NotificationServiceInterface,
        @inject(INJECTION_TOKENS.MailService) private mailService: MailServiceInterface,
        @inject(INJECTION_TOKENS.CryptoService) private cryptoService: CryptoServiceInterface) {
        
    }

    createTargetIdentifier(): TargetIdentifierInterface {
        return new TargetIdentifier(this.prisma);
    }
    
    createActionHandler(actionType: ActionType): ActionHandlerInterface {
        switch(actionType) {
            case ActionType.ApplyThesis: return new ApplyThesisActionHandler(this.prisma);
            case ActionType.Approve: return new ApproveActionHandler();
            case ActionType.Cancel: return new CancelActionHandler();
            case ActionType.Confirm: return new ConfirmActionHandler();
            case ActionType.Deny: return new DenyActionHandler();
            case ActionType.InformAdmin: return new InformAdminActionHandler(this.prisma, this.notificationService);
            case ActionType.InformRequester: return new InformRequesterActionHandler(this.notificationService);
            case ActionType.Reject: return new RejectActionHandler();
            case ActionType.RequestAdmin: return new RequestAdminActionHandler(this.prisma, this.notificationService);
            case ActionType.RequestSupervisor1: return new RequestSupervisor1ActionHandler(this.prisma, this.notificationService);
            case ActionType.RequestSupervisor2: return new RequestSupervisor2ActionHandler(this.prisma, this.notificationService);
            default: return new SimpleActionHandler();
        }
    }

    createActivityHandler(activityType: ActivityType): ActivityHandlerInterface {
        switch(activityType) {
            case ActivityType.Notify: return new NotifyActivityHandler(this.prisma, this.notificationService);
            case ActivityType.SendEmail: return new SendEmailActivityHandler(this.prisma, this.mailService, this.cryptoService);
            case ActivityType.AddStakeholders: return new AddStakeholdersActivityHandler(this.prisma);
            default: return new SimpleActivityHandler();
        }
    }
}