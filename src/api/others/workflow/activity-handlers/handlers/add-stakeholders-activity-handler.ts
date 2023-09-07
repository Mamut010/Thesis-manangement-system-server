import { PrismaClient } from "@prisma/client";
import { ActivityHandlerInterface } from "../interfaces/activity-handler.interface";
import { ActivityHandlerInput, ActivityHandlerOutput } from "../types";
import { removeDuplicates } from "../../../../../utils/array-helpers";

export class AddStakeholdersActivityHandler implements ActivityHandlerInterface {
    constructor(private prisma: PrismaClient) {

    }

    async handle(requestId: string, activityInput: ActivityHandlerInput): Promise<ActivityHandlerOutput> {
        if (!activityInput.actionerId) {
            return { requestUsers: activityInput.requestUsers };
        }

        await this.prisma.request.update({
            where: {
                id: requestId
            },
            data: {
                stakeholders: {
                    connect: {
                        userId: activityInput.actionerId
                    }
                }
            }
        })

        return {
            requestUsers: {
                requesterId: activityInput.requestUsers.requesterId,
                stakeholderIds: removeDuplicates(activityInput.requestUsers.stakeholderIds.concat(activityInput.actionerId)),
            }
        }
    }
}