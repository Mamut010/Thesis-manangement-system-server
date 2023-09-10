import { ActivityHandlerInput } from "../types";
import { BaseNotifyActivityHandler } from "../bases/base-notify-activity-handler";
import { MailServiceInterface } from "../../../../../shared/interfaces";
import { DEFAULTS } from "../../constants/defaults";
import { DEFAULT_FORMATS } from "../constants/default-formats";
import { stringFormat } from "../../../../../utils/string-helpers";
import { GroupRepoInterface, RequestDataRepoInterface, UserRepoInterface } from "../../../../../dal/interfaces";
import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../../../core/constants/injection-tokens";
import { WorkflowRequestDataProcessorInterface } from "../../request-data-processor";

@injectable()
export class SendEmailActivityHandler extends BaseNotifyActivityHandler {
    constructor(
        @inject(INJECTION_TOKENS.RequestDataRepo) requestDataRepo: RequestDataRepoInterface,
        @inject(INJECTION_TOKENS.GroupRepo) groupRepo: GroupRepoInterface,
        @inject(INJECTION_TOKENS.WorkflowRequestDataProcessor) requestDataProcessor: WorkflowRequestDataProcessorInterface,
        @inject(INJECTION_TOKENS.UserRepo) private userRepo: UserRepoInterface,
        @inject(INJECTION_TOKENS.MailService) private emailService: MailServiceInterface) {
        super(requestDataRepo, groupRepo, requestDataProcessor);
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