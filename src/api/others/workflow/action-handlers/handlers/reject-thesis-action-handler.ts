import { PrismaClient } from "@prisma/client";
import { STORED_REQUEST_DATA_KEYS } from "../../constants/request-data-keys";
import { ActionHandlerInput, ActionHandlerOutput } from "../types";
import { BaseActionHandler } from "../bases/base-action-handler";
import { makeStoredDataValue } from "../../utils/request-data-helpers";
import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../../../core/constants/injection-tokens";

@injectable()
export class RejectThesisActionHandler extends BaseActionHandler {
    constructor(@inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient) {
        super();
    }

    async handle(requestId: string, actionInput: ActionHandlerInput): Promise<ActionHandlerOutput> {
        await this.prisma.request.update({
            where: {
                id: requestId,
            },
            data: {
                data: {
                    deleteMany: {
                        name: STORED_REQUEST_DATA_KEYS.Thesis,
                    }
                }
            }
        });

        return {
            requestUsers: actionInput.requestUsers,
            resolvedUserIds: [actionInput.actionerId],
        };
    }
}