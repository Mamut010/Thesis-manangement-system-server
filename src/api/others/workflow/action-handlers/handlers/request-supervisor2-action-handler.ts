import { SimpleRequestActionHandler } from './simple-request-action-handler';
import { NotificationServiceInterface } from "../../../../../shared/interfaces";
import { STORED_REQUEST_DATA_KEYS } from "../../constants/request-data-keys";
import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../../../core/constants/injection-tokens";
import { RequestDataRepoInterface } from "../../../../../dal/interfaces";
import { WorkflowRequestDataProcessorInterface } from '../../request-data-processor';

@injectable()
export class RequestSupervisor2ActionHandler extends SimpleRequestActionHandler {
    constructor(
        @inject(INJECTION_TOKENS.RequestDataRepo) requestDataRepo: RequestDataRepoInterface,
        @inject(INJECTION_TOKENS.WorkflowRequestDataProcessor) requestDataProcessor: WorkflowRequestDataProcessorInterface,
        @inject(INJECTION_TOKENS.NotificationService) notificationService: NotificationServiceInterface) {
        super(requestDataRepo, requestDataProcessor, STORED_REQUEST_DATA_KEYS.Supervisor2, notificationService);
    }
}