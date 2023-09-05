import { PrismaClient } from "@prisma/client";
import { ActionHandlerInput, ActionHandlerOutput } from "../types";
import { BaseActionHandler } from "./base-action-handler";
import { makeStoredDataValue } from "../../utils/request-data-helpers";

export abstract class BaseRequestActionHandler extends BaseActionHandler {
    constructor(protected prisma: PrismaClient, protected dataKey: string) {
        super();
    }

    async handle(requestId: string, actionInput: ActionHandlerInput): Promise<ActionHandlerOutput> {
        const dataValue = this.getInputDataStringValue(actionInput, this.dataKey);
        const handlerOutput = await this.sendRequest(dataValue, actionInput);
        await this.updateRequestData(requestId, dataValue, actionInput);
        return handlerOutput;
    }

    protected abstract sendRequest(dataValue: string, actionInput: ActionHandlerInput): Promise<ActionHandlerOutput>;

    private async updateRequestData(requestId: string, dataValue: string, actionInput: ActionHandlerInput) {
        const storedData = {
            name: this.dataKey,
            value: makeStoredDataValue(dataValue),
        };

        await this.prisma.request.update({
            where: {
                id: requestId,
            },
            data: {
                data: {
                    upsert: {
                        where: {
                            requestId_name: {
                                requestId: requestId,
                                name: storedData.name,
                            }
                        },
                        create: storedData,
                        update: {
                            value: storedData.value
                        }
                    }
                }
            }
        });
    }
}