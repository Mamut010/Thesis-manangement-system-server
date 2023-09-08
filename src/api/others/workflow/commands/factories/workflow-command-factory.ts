import { injectable } from "inversify";
import { ERROR_MESSAGES } from "../../../../../contracts/constants/error-messages";
import { BadRequestError } from "../../../../../contracts/errors/bad-request.error";
import { STORED_REQUEST_DATA_KEYS } from "../../constants/request-data-keys";
import { WorkflowEngineInterface } from "../../engines";
import { ActionType } from "../../types/action-type";
import { ApplyThesisCommand } from "../concrete-commands/apply-thesis-command";
import { ApproveCommand } from "../concrete-commands/approve-command";
import { CancelCommand } from "../concrete-commands/cancel-command";
import { ConfirmCommand } from "../concrete-commands/confirm-command";
import { DenyCommand } from "../concrete-commands/deny-command";
import { InformAdminGroupCommand } from "../concrete-commands/inform-admin-group-command";
import { InformRequesterCommand } from "../concrete-commands/inform-requester-command";
import { RequestAdminGroupCommand } from "../concrete-commands/request-admin-group-command";
import { RequestSupervisor1Command } from "../concrete-commands/request-supervisor1-command";
import { RequestSupervisor2Command } from "../concrete-commands/request-supervisor2-command";
import { RequestAdvanceCommandInterface } from "../interfaces/request-advance-command";
import { WorkflowCommandFactoryInterface } from "../interfaces/workflow-command-factory.interface";
import { RequestAdvanceCommandInput } from "../types";

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

            case ActionType.Cancel:
                return new CancelCommand(engine, commandInput.actionerId, commandInput.requestId);

            case ActionType.Confirm:
                return new ConfirmCommand(engine, commandInput.actionerId, commandInput.requestId);

            case ActionType.Deny:
                return new DenyCommand(engine, commandInput.actionerId, commandInput.requestId);

            case ActionType.InformAdminGroup:
                return new InformAdminGroupCommand(engine, commandInput.actionerId, commandInput.requestId,
                    this.getStringValueFromData(commandInput.data, STORED_REQUEST_DATA_KEYS.AdminGroup));

            case ActionType.InformRequester:
                return new InformRequesterCommand(engine, commandInput.actionerId, commandInput.requestId);

            case ActionType.RequestAdminGroup:
                return new RequestAdminGroupCommand(engine, commandInput.actionerId, commandInput.requestId,
                    this.getStringValueFromData(commandInput.data, STORED_REQUEST_DATA_KEYS.AdminGroup));

            case ActionType.RequestSupervisor1:
                return new RequestSupervisor1Command(engine, commandInput.actionerId, commandInput.requestId,
                    this.getStringValueFromData(commandInput.data, STORED_REQUEST_DATA_KEYS.Supervisor1));

            case ActionType.RequestSupervisor2:
                return new RequestSupervisor2Command(engine, commandInput.actionerId, commandInput.requestId,
                    this.getStringValueFromData(commandInput.data, STORED_REQUEST_DATA_KEYS.Supervisor2));
        }
    }

    private getStringValueFromData(data: Record<string, unknown> | undefined, key: string) {
        const value = data?.[key];
        if (typeof value !== 'string') {
            throw new BadRequestError(ERROR_MESSAGES.BadRequest.MissingNecessaryRequestData);
        }
        return value;
    }
}