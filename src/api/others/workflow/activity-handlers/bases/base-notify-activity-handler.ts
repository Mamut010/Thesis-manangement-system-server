import { Target } from "../../types/targets";
import { ActivityHandlerInput, ActivityHandlerOutput } from "../types";
import { STORED_REQUEST_DATA_KEYS } from "../../constants/request-data-keys";
import { getIndividualDataKeyByTarget, getRequestDataStringValueByKey } from "../../utils/request-data-helpers";
import { RequestUsersDto } from "../../types/dtos";
import { makeArray, removeDuplicates, uniqueFrom } from "../../../../../utils/array-helpers";
import { GroupRepoInterface, RequestDataRepoInterface } from "../../../../../dal/interfaces";
import { WorkflowRequestDataProcessorInterface } from "../../request-data-processor";
import { Stakeholder } from "../../types/utility-types";
import { BaseActivityHandler } from "./base-activity-handler";

export abstract class BaseNotifyActivityHandler extends BaseActivityHandler {
    constructor(
        protected requestDataRepo: RequestDataRepoInterface,
        protected groupRepo: GroupRepoInterface,
        protected requestDataProcessor: WorkflowRequestDataProcessorInterface) {
        super();
    }

    public async handle(requestId: string, activityInput: ActivityHandlerInput): Promise<ActivityHandlerOutput> {
        const orgReceiverIds = await this.getUserIdsFromTarget(requestId, activityInput.target, activityInput.requestUsers);
        let receiverIds = activityInput.actionResolvedUserIds
            ? uniqueFrom(orgReceiverIds, activityInput.actionResolvedUserIds)
            : removeDuplicates(orgReceiverIds);

        if (receiverIds.length === 0) {
            return this.defaultOutput(activityInput);
        }

        const executionResult = await this.execute(requestId, receiverIds, activityInput);

        return {
            requestUsers: activityInput.requestUsers,
            resolvedUserIds: executionResult ? makeArray(executionResult) : undefined,
        }
    }

    protected abstract execute(requestId: string, receiverIds: string[], activityInput: ActivityHandlerInput)
        : Promise<void | string | string[]>;

    private async getUserIdsFromTarget(requestId: string, target: Target, requestUsers: RequestUsersDto) {
        if (target === Target.Requester) {
            return makeArray(requestUsers.requesterId);
        }
        else if (target === Target.Stakeholders) {
            return this.getAllAcceptedStakeholderIds(requestUsers.requestStakeholders);
        }
        else if (target === Target.AdminGroup) {
            return this.getAdminGroupUserIds(requestId);
        }

        const key = getIndividualDataKeyByTarget(target);
        if (!key) {
            return [];
        }

        const userId = await getRequestDataStringValueByKey(requestId, key, this.makeRequestRepoDeps());
        return userId ? [userId] : []
    }

    private getAllAcceptedStakeholderIds(stakeholders: Stakeholder[]) {
        return stakeholders
            .flatMap(item => item.isAccepted ? (item.userId ?? item.memberIds) : []);
    }

    private async getAdminGroupUserIds(requestId: string) {
        const adminGroupId = await getRequestDataStringValueByKey(requestId, STORED_REQUEST_DATA_KEYS.AdminGroup, 
            this.makeRequestRepoDeps());
        if (!adminGroupId) {
            return [];
        }

        const group = await this.groupRepo.findOneById(adminGroupId);
        return group?.memberIds ?? [];
    }

    private makeRequestRepoDeps() {
        return {
            repo: this.requestDataRepo, 
            processor: this.requestDataProcessor,
        }
    }
}