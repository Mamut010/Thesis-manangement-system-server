import { ActivityHandlerInterface } from "../interfaces/activity-handler.interface";
import { ActivityHandlerInput, ActivityHandlerOutput } from "../types";
import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../../../core/constants/injection-tokens";
import { RequestRepoInterface } from "../../../../../dal/interfaces";
import { ERROR_MESSAGES } from "../../../../../contracts/constants/error-messages";
import { NotFoundError } from "../../../../../contracts/errors/not-found.error";

@injectable()
export class AddStakeholdersActivityHandler implements ActivityHandlerInterface {
    constructor(@inject(INJECTION_TOKENS.RequestRepo) private requestRepo: RequestRepoInterface) {

    }

    async handle(requestId: string, activityInput: ActivityHandlerInput): Promise<ActivityHandlerOutput> {
        if (!activityInput.actionerId) {
            return { requestUsers: activityInput.requestUsers };
        }

        const request = await this.requestRepo.updateMembers(requestId, {
            addedUserIds: [activityInput.actionerId]
        });
        if (!request) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.RequestNotFound);
        }

        return {
            requestUsers: {
                requesterId: activityInput.requestUsers.requesterId,
                stakeholderIds: request?.stakeholderIds,
            }
        }
    }
}