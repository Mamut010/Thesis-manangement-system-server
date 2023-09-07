import { PrismaClient } from "@prisma/client";
import { ActivityHandlerInput } from "../types";
import { BaseNotifyActivityHandler } from "../bases/base-notify-activity-handler";
import { MailServiceInterface } from "../../../../../shared/interfaces";
import { DEFAULTS } from "../../constants/defaults";
import { DEFAULT_FORMATS } from "../constants/default-formats";
import { stringFormat } from "../../../../../utils/string-helpers";
import { UserRepoInterface } from "../../../../../dal/interfaces";

export class SendEmailActivityHandler extends BaseNotifyActivityHandler {
    constructor(
        prisma: PrismaClient, 
        private userRepo: UserRepoInterface,
        private emailService: MailServiceInterface) {
        super(prisma);
    }

    protected async execute(requestId: string, receiverIds: string[], activityInput: ActivityHandlerInput): Promise<void> {
        const users = await this.userRepo.findManyByIds(receiverIds);
        const emails = users.map(user => user.email)
                            .filter((email): email is string => typeof email === 'string');

        await this.emailService.sendTextMail(stringFormat(DEFAULT_FORMATS.Email.Content, requestId), {
            from: DEFAULTS.Email.From,
            to: emails,
            subject: DEFAULTS.Email.Subject,
        });
    }
}