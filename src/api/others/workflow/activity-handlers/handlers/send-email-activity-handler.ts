import { PrismaClient } from "@prisma/client";
import { ActivityHandlerInput } from "../types";
import { BaseNotifyActivityHandler } from "../bases/base-notify-activity-handler";
import { CryptoServiceInterface, MailServiceInterface } from "../../../../../shared/interfaces";
import { DEFAULTS } from "../../constants/defaults";
import { DEFAULT_FORMATS } from "../constants/default-formats";
import { stringFormat } from "../../../../../utils/string-helpers";
import { env } from "../../../../../env";

export class SendEmailActivityHandler extends BaseNotifyActivityHandler {
    constructor(
        prisma: PrismaClient, 
        private emailService: MailServiceInterface, 
        private cryptoService: CryptoServiceInterface) {
        super(prisma);
    }

    protected async execute(requestId: string, receiverIds: string[], activityInput: ActivityHandlerInput): Promise<void> {
        const users = await this.prisma.user.findMany({
            where: {
                userId: {
                    in: receiverIds
                }
            },
            select: {
                email: true,
            }
        });

        users.forEach(user => {
            if (user.email) {
                try {
                    user.email = this.cryptoService.decryptAsString(user.email);
                }
                catch(err) {
                    if (env.isProduction) {
                        throw err;
                    }
                }
            }
        });

        const emails = users.map(user => user.email)
                            .filter((email): email is string => typeof email === 'string');

        await this.emailService.sendTextMail(stringFormat(DEFAULT_FORMATS.Email.Content, requestId), {
            from: DEFAULTS.Email.From,
            to: emails,
            subject: DEFAULTS.Email.Subject,
        });
    }
}