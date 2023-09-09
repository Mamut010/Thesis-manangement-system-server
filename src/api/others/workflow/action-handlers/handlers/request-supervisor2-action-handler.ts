import { PrismaClient } from "@prisma/client";
import { SimpleRequestActionHandler } from './simple-request-action-handler';
import { NotificationServiceInterface } from "../../../../../shared/interfaces";
import { STORED_REQUEST_DATA_KEYS } from "../../constants/request-data-keys";
import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../../../core/constants/injection-tokens";

@injectable()
export class RequestSupervisor2ActionHandler extends SimpleRequestActionHandler {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) prisma: PrismaClient, 
        @inject(INJECTION_TOKENS.NotificationService) notificationService: NotificationServiceInterface) {
        super(prisma, STORED_REQUEST_DATA_KEYS.Supervisor2, notificationService);
    }
}