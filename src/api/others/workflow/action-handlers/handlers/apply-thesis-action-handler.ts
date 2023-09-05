import { PrismaClient } from "@prisma/client";
import { STORED_REQUEST_DATA_KEYS } from "../../constants/request-data-keys";
import { ActionHandlerInput, ActionHandlerOutput } from "../types";
import { BaseActionHandler } from "../bases/base-action-handler";
import { makeStoredDataValue } from "../../utils/request-data-helpers";

export class ApplyThesisActionHandler extends BaseActionHandler {
    constructor(private prisma: PrismaClient) {
        super();
    }

    async handle(requestId: string, actionInput: ActionHandlerInput)
        : Promise<ActionHandlerOutput> {
        const thesisId = this.getInputDataStringValue(actionInput, STORED_REQUEST_DATA_KEYS.Thesis);
        await this.prisma.request.update({
            where: {
                id: requestId,
            },
            data: {
                data: {
                    create: {
                        name: STORED_REQUEST_DATA_KEYS.Thesis,
                        value: makeStoredDataValue(thesisId),
                    }
                }
            }
        });

        return {
            requestUsersInfo: actionInput.requestUsersInfo,
            resolvedUserIds: [actionInput.actionerId]
        };
    }
}