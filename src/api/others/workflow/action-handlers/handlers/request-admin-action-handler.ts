import { PrismaClient } from "@prisma/client";
import { ActionHandlerInput, ActionHandlerOutput } from "../types";
import { BaseRequestActionHandler } from "../bases/base-request-action-handler";
import { NotificationServiceInterface } from "../../../../../shared/interfaces";
import { STORED_REQUEST_DATA_KEYS } from "../../constants/request-data-keys";
import { NotFoundError } from "../../../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../../../contracts/constants/error-messages";
import { getTitleAndContentFromData } from "../../utils/action-handler-helpers";
import { removeDuplicates } from "../../../../../utils/array-helpers";
import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../../../core/constants/injection-tokens";

@injectable()
export class RequestAdminActionHandler extends BaseRequestActionHandler {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) prisma: PrismaClient, 
        @inject(INJECTION_TOKENS.NotificationService) private notificationService: NotificationServiceInterface) {
        super(prisma, STORED_REQUEST_DATA_KEYS.AdminGroup);
    }

    protected async sendRequest(dataValue: string, actionInput: ActionHandlerInput): Promise<ActionHandlerOutput> {
        const group = await this.prisma.group.findUnique({
            where: {
                id: dataValue
            },
            select: {
                users: {
                    select: {
                        userId: true
                    }
                }
            }
        });

        if (!group) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.GroupNotFound);
        }

        const groupUserIds: string[] = [];
        await Promise.all(group.users.map(user => {
            groupUserIds.push(user.userId);
            return this.notificationService.sendNotification({
                senderId: actionInput.actionerId,
                receiverId: user.userId,
                ...getTitleAndContentFromData(actionInput.data),
            })
        }));

        return {
            requestUsers: actionInput.requestUsers,
            resolvedUserIds: removeDuplicates(groupUserIds.concat(actionInput.actionerId))
        };
    }
}