import { DEFAULTS } from "../../constants/defaults";
import { NotificationServiceInterface } from "../../../../../shared/interfaces";
import { stringFormat } from "../../../../../utils/string-helpers";
import { DEFAULT_FORMATS } from "../constants/default-formats";
import { ActivityHandlerInput } from "../types";
import { BaseNotifyActivityHandler } from "../bases/base-notify-activity-handler";
import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../../../core/constants/injection-tokens";
import { GroupRepoInterface, RequestDataRepoInterface } from "../../../../../dal/interfaces";

@injectable()
export class NotifyActivityHandler extends BaseNotifyActivityHandler {
    constructor(
        @inject(INJECTION_TOKENS.RequestRepo) requestDataRepo: RequestDataRepoInterface,
        @inject(INJECTION_TOKENS.GroupRepo) groupRepo: GroupRepoInterface,
        @inject(INJECTION_TOKENS.NotificationService) private notificationService: NotificationServiceInterface) {
        super(requestDataRepo, groupRepo);
    }

    protected async execute(requestId: string, receiverIds: string[], activityInput: ActivityHandlerInput): Promise<void> {
        await Promise.all(receiverIds.map(async (receiverId) => {
            await this.notificationService.sendNotification({
                receiverId,
                title: DEFAULTS.Notification.Title,
                content: stringFormat(DEFAULT_FORMATS.Notification.Content, requestId)
            });
        }));
    }
}