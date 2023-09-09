import { Target } from "../../types/targets";
import { ActivityHandlerInterface } from "../interfaces/activity-handler.interface";
import { ActivityHandlerInput, ActivityHandlerOutput } from "../types";
import { STORED_REQUEST_DATA_KEYS } from "../../constants/request-data-keys";
import { getRequestDataValueByKey } from "../../utils/request-data-helpers";
import { RequestUsersDto } from "../../types/dtos";
import { makeArray, uniqueFrom } from "../../../../../utils/array-helpers";
import { injectable } from "inversify";
import { GroupRepoInterface, RequestDataRepoInterface } from "../../../../../dal/interfaces";

@injectable()
export abstract class BaseNotifyActivityHandler implements ActivityHandlerInterface {
    constructor(
        protected requestDataRepo: RequestDataRepoInterface,
        protected groupRepo: GroupRepoInterface) {

    }

    public async handle(requestId: string, activityInput: ActivityHandlerInput): Promise<ActivityHandlerOutput> {
        const orgReceiverIds = await this.getUserIdsFromTarget(requestId, activityInput.target, activityInput.requestUsers);
        let receiverIds = activityInput.actionResolvedUserIds
            ? uniqueFrom(orgReceiverIds, activityInput.actionResolvedUserIds)
            : orgReceiverIds;

        if (receiverIds.length === 0) {
            return { requestUsers: activityInput.requestUsers };
        }

        const executionResult = await this.execute(requestId, receiverIds, activityInput);
        receiverIds = executionResult ? makeArray(executionResult) : receiverIds;

        return {
            requestUsers: activityInput.requestUsers,
            resolvedUserIds: receiverIds,
        }
    }

    protected abstract execute(requestId: string, receiverIds: string[], activityInput: ActivityHandlerInput)
        : Promise<void | string | string[]>;

    protected async getRequestDataStringValueByKey(requestId: string, key: string) {
        const value = await getRequestDataValueByKey(this.requestDataRepo, requestId, key);
        return typeof value === 'string' ? value : undefined;
    }

    private async getUserIdsFromTarget(requestId: string, target: Target, requestUsers: RequestUsersDto) {
        if (target === Target.Requester) {
            return [requestUsers.requesterId];
        }
        else if (target === Target.Stakeholders) {
            return requestUsers.stakeholderIds;
        }
        else if (target === Target.AdminGroup) {
            const adminGroupId = await this.getRequestDataStringValueByKey(requestId, STORED_REQUEST_DATA_KEYS.AdminGroup);
            if (!adminGroupId) {
                return [];
            }

            const group = await this.groupRepo.findOneById(adminGroupId);
            return group?.memberIds ?? [];
        }
        else {
            const key = target === Target.Supervisor1
                ? STORED_REQUEST_DATA_KEYS.Supervisor1
                : STORED_REQUEST_DATA_KEYS.Supervisor2;

            const supervisorId = await this.getRequestDataStringValueByKey(requestId, key);
            return supervisorId ? [supervisorId] : []
        }
    }
}