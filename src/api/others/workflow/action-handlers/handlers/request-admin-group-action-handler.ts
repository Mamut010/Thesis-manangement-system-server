import { NotificationServiceInterface } from "../../../../../shared/interfaces";
import { STORED_REQUEST_DATA_KEYS } from "../../constants/request-data-keys";
import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../../../core/constants/injection-tokens";
import { GroupRepoInterface, RequestDataRepoInterface } from "../../../../../dal/interfaces";
import { WorkflowRequestDataProcessorInterface } from "../../request-data-processor";
import { GroupRequestActionHandler } from "./group-request-action-handler";

@injectable()
export class RequestAdminGroupActionHandler extends GroupRequestActionHandler {
    constructor(
        @inject(INJECTION_TOKENS.RequestDataRepo) requestDataRepo: RequestDataRepoInterface,
        @inject(INJECTION_TOKENS.WorkflowRequestDataProcessor) requestDataProcessor: WorkflowRequestDataProcessorInterface,
        @inject(INJECTION_TOKENS.GroupRepo) groupRepo: GroupRepoInterface,
        @inject(INJECTION_TOKENS.NotificationService) notificationService: NotificationServiceInterface) {
        super(requestDataRepo, requestDataProcessor, STORED_REQUEST_DATA_KEYS.AdminGroup, groupRepo, notificationService);
    }
}