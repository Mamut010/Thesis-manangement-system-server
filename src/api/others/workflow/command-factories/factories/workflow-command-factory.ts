import { injectable } from "inversify";
import { ERROR_MESSAGES } from "../../../../../contracts/constants/error-messages";
import { BadRequestError } from "../../../../../contracts/errors/bad-request.error";
import { STORED_REQUEST_DATA_KEYS } from "../../constants/request-data-keys";
import { WorkflowEngineInterface } from "../../engines";
import { ActionType } from "../../types/action-type";
import { WorkflowCommandFactoryInterface } from "../interfaces/workflow-command-factory.interface";
import { 
    ApplyThesisCommand,
    ApproveCommand,
    BackCommand,
    CancelCommand,
    ConfirmCommand,
    ConfirmThesisCommand,
    DenyCommand,
    InformAdminGroupCommand,
    InformRequesterCommand,
    InviteSupervisor2Command,
    RejectCommand,
    RejectThesisCommand,
    RequestAdminGroupCommand,
    RequestAdvanceCommandInput, 
    RequestAdvanceCommandInterface,
    RequestSupervisor1Command,
    RequestSupervisor2Command
} from "../../commands";

@injectable()
export class WorkflowCommandFactory implements WorkflowCommandFactoryInterface {
    createCommand(engine: WorkflowEngineInterface, actionType: ActionType, commandInput: RequestAdvanceCommandInput)
        : RequestAdvanceCommandInterface | undefined {
        switch(actionType) {
            case ActionType.ApplyThesis:
                return new ApplyThesisCommand(engine, commandInput.actionerId, commandInput.requestId,
                    this.getStringValueFromData(commandInput.data, STORED_REQUEST_DATA_KEYS.Thesis));

            case ActionType.Approve:
                return new ApproveCommand(engine, commandInput.actionerId, commandInput.requestId);

            case ActionType.Back:
                return new BackCommand(engine, commandInput.actionerId, commandInput.requestId);

            case ActionType.Cancel:
                return new CancelCommand(engine, commandInput.actionerId, commandInput.requestId);

            case ActionType.Confirm:
                return new ConfirmCommand(engine, commandInput.actionerId, commandInput.requestId);

            case ActionType.ConfirmThesis:
                return new ConfirmThesisCommand(engine, commandInput.actionerId, commandInput.requestId);

            case ActionType.Deny:
                return new DenyCommand(engine, commandInput.actionerId, commandInput.requestId);

            case ActionType.InformAdminGroup:
                return new InformAdminGroupCommand(engine, commandInput.actionerId, commandInput.requestId,
                    this.getStringValueFromData(commandInput.data, STORED_REQUEST_DATA_KEYS.AdminGroup));

            case ActionType.InformRequester:
                return new InformRequesterCommand(engine, commandInput.actionerId, commandInput.requestId);

            case ActionType.InviteSupervisor2:
                return new InviteSupervisor2Command(engine, commandInput.actionerId, commandInput.requestId,
                    this.getStringValueFromData(commandInput.data, STORED_REQUEST_DATA_KEYS.Supervisor2));

            case ActionType.Reject:
                return new RejectCommand(engine, commandInput.actionerId, commandInput.requestId);

            case ActionType.RejectThesis:
                return new RejectThesisCommand(engine, commandInput.actionerId, commandInput.requestId);

            case ActionType.RequestAdminGroup:
                return new RequestAdminGroupCommand(engine, commandInput.actionerId, commandInput.requestId);

            case ActionType.RequestSupervisor1:
                return new RequestSupervisor1Command(engine, commandInput.actionerId, commandInput.requestId);

            case ActionType.RequestSupervisor2:
                return new RequestSupervisor2Command(engine, commandInput.actionerId, commandInput.requestId);
        }
    }

    private getStringValueFromData(data: Record<string, unknown> | undefined, key: string) {
        const value = data?.[key];
        if (typeof value !== 'string') {
            throw new BadRequestError(ERROR_MESSAGES.BadRequest.MissingRequiredStringRequestData + `: ${key}`);
        }
        return value;
    }
}