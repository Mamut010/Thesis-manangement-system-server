import { PrismaClient } from "@prisma/client";
import { SimpleBaseRequestActionHandler } from './simple-request-action-handler';
import { NotificationServiceInterface } from "../../../../../shared/interfaces";
import { STORED_REQUEST_DATA_KEYS } from "../../constants/request-data-keys";

export class RequestSupervisor2ActionHandler extends SimpleBaseRequestActionHandler {
    constructor(prisma: PrismaClient, notificationService: NotificationServiceInterface) {
        super(prisma, STORED_REQUEST_DATA_KEYS.Supervisor2, notificationService);
    }
}