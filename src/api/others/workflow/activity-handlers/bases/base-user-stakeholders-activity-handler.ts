import { ActivityHandlerInput, ActivityHandlerOutput } from "../types";
import { ERROR_MESSAGES } from "../../../../../contracts/constants/error-messages";
import { NotFoundError } from "../../../../../contracts/errors/not-found.error";
import { RequestDataRepoInterface, RequestStakeholderRepoInterface } from "../../../../../dal/interfaces";
import { BaseActivityHandler } from "./base-activity-handler";
import { Target } from "../../types/targets";
import { getIndividualDataKeyByTarget, getRequestDataStringValueByKey } from "../../utils/request-data-helpers";
import { WorkflowRequestDataProcessorInterface } from "../../request-data-processor";
import { RequestStakeholderDto } from "../../../../../shared/dtos";

export abstract class BaseUserStakeholdersActivityHandler extends BaseActivityHandler {
    constructor(
        protected requestStakeholderRepo: RequestStakeholderRepoInterface,
        protected requestDataRepo: RequestDataRepoInterface,
        protected requestDataProcessor: WorkflowRequestDataProcessorInterface) {
        super();
    }

    async handle(requestId: string, activityInput: ActivityHandlerInput): Promise<ActivityHandlerOutput> {
        const userId = await this.getUserIdByTarget(requestId, activityInput.target);
        if (!userId) {
            return this.defaultOutput(activityInput);
        }

        const executionResult = await this.execute(requestId, userId, activityInput);
        if (!executionResult) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.RequestNotFound);
        }

        return executionResult instanceof RequestStakeholderDto 
            ? {
                requestUsers: {
                    requesterId: activityInput.requestUsers.requesterId,
                    userStakeholders: executionResult.userStakeholders,
                    groupStakeholders: executionResult.groupStakeholders,
                } 
            } 
            : executionResult;
    }

    protected abstract execute(requestId: string, userId: string, activityInput: ActivityHandlerInput)
        : Promise<ActivityHandlerOutput | RequestStakeholderDto | null>;

    private async getUserIdByTarget(requestId: string, target: Target): Promise<string | undefined> {
        const key = getIndividualDataKeyByTarget(target);
        return key 
            ? await getRequestDataStringValueByKey(requestId, key, {
                repo: this.requestDataRepo,
                processor: this.requestDataProcessor,
            })
            : undefined;
    }
}