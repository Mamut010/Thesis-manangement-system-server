import { PrismaClient } from "@prisma/client";
import { Target } from "../../types/targets";
import { ActivityHandlerInterface } from "../interfaces/activity-handler.interface";
import { ActivityHandlerInput, ActivityHandlerOutput } from "../types";
import { STORED_REQUEST_DATA_KEYS } from "../../constants/request-data-keys";
import { getRequestDataStringValueByKey } from "../../utils/request-data-helpers";
import { RequestUsersInfo } from "../../types/infos";
import { makeArray, uniqueFrom } from "../../../../../utils/array-helpers";

export abstract class BaseNotifyActivityHandler implements ActivityHandlerInterface {
    constructor(protected prisma: PrismaClient) {

    }

    public async handle(requestId: string, activityInput: ActivityHandlerInput): Promise<ActivityHandlerOutput> {
        const orgReceiverIds = await this.getUserIdsFromTarget(requestId, activityInput.target, activityInput.requestUsersInfo);
        let receiverIds = activityInput.actionResolvedUserIds
            ? uniqueFrom(orgReceiverIds, activityInput.actionResolvedUserIds)
            : orgReceiverIds;

        if (receiverIds.length === 0) {
            return { requestUsersInfo: activityInput.requestUsersInfo };
        }

        const executionResult = await this.execute(requestId, receiverIds, activityInput);
        receiverIds = executionResult ? makeArray(executionResult) : receiverIds;

        return {
            requestUsersInfo: activityInput.requestUsersInfo,
            resolvedUserIds: receiverIds,
        }
    }

    protected abstract execute(requestId: string, receiverIds: string[], activityInput: ActivityHandlerInput)
        : Promise<void | string | string[]>;

    private async getUserIdsFromTarget(requestId: string, target: Target, requestUsersInfo: RequestUsersInfo) {
        if (target === Target.Requester) {
            return [requestUsersInfo.requesterId];
        }
        else if (target === Target.Stakeholders) {
            return requestUsersInfo.stakeholderIds;
        }
        else if (target === Target.AdminGroup) {
            const adminGroupId = await getRequestDataStringValueByKey(this.prisma, requestId, STORED_REQUEST_DATA_KEYS.AdminGroup);
            if (adminGroupId) {
                return [];
            }

            const group = await this.prisma.group.findUnique({
                where: {
                    id: adminGroupId
                },
                select: {
                    users: {
                        select: {
                            userId: true
                        }
                    }
                }
            });

            return group?.users.map(user => user.userId) ?? [];
        }
        else {
            const key = target === Target.Supervisor1
                ? STORED_REQUEST_DATA_KEYS.Supervisor1
                : STORED_REQUEST_DATA_KEYS.Supervisor2;

            const supervisorId = await getRequestDataStringValueByKey(this.prisma, requestId, key);
            return supervisorId ? [supervisorId] : []
        }
    }
}