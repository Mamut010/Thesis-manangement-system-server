import { ActivityHandlerInput, ActivityHandlerOutput } from "../types";
import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../../../core/constants/injection-tokens";
import { RequestDataRepoInterface, RequestStakeholderRepoInterface } from "../../../../../dal/interfaces";
import { WorkflowRequestDataProcessorInterface } from "../../request-data-processor";
import { BaseUserStakeholdersActivityHandler } from "../bases/base-user-stakeholders-activity-handler";
import { RequestStakeholderDto } from "../../../../../shared/dtos";

@injectable()
export class AddStakeholdersActivityHandler extends BaseUserStakeholdersActivityHandler {
    constructor(
        @inject(INJECTION_TOKENS.RequestStakeholderRepo) requestStakeholderRepo: RequestStakeholderRepoInterface,
        @inject(INJECTION_TOKENS.RequestDataRepo) requestDataRepo: RequestDataRepoInterface,
        @inject(INJECTION_TOKENS.WorkflowRequestDataProcessor) requestDataProcessor: WorkflowRequestDataProcessorInterface) {
        super(requestStakeholderRepo, requestDataRepo, requestDataProcessor);
    }

    protected execute(requestId: string, userId: string, activityInput: ActivityHandlerInput)
        : Promise<ActivityHandlerOutput | RequestStakeholderDto | null> {
        return this.requestStakeholderRepo.updateUserStakeholders(requestId, {
            addedUserIds: [userId]
        });
    }
}