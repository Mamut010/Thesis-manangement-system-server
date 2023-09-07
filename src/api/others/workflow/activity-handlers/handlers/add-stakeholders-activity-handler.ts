import { PrismaClient } from "@prisma/client";
import { ActivityHandlerInterface } from "../interfaces/activity-handler.interface";
import { ActivityHandlerInput, ActivityHandlerOutput } from "../types";
import { removeDuplicates } from "../../../../../utils/array-helpers";
import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../../../core/constants/injection-tokens";

@injectable()
export class AddStakeholdersActivityHandler implements ActivityHandlerInterface {
    constructor(@inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient) {

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