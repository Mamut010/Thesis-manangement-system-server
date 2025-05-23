import { inject, injectable } from "inversify";
import { RequestDataRepoInterface } from "../interfaces";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { PlainTransformerInterface } from "../utils/plain-transfomer";
import { NameValuePair, RequestIdAndName } from "../types/utility-types";
import { RequestDataDto } from "../../shared/dtos";
import { wrapUniqueConstraint } from "../utils/prisma-helpers";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { makeArray } from "../../utils/array-helpers";

@injectable()
export class RequestDataRepo implements RequestDataRepoInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface) {

    }

    async findMany(requestId: string, names?: string[]): Promise<RequestDataDto[]> {
        const records = await this.prisma.requestData.findMany({
            where: {
                requestId: requestId,
                name: names ? {
                    in: names
                } : undefined,
            }
        });
        return records.map(item => this.plainTransformer.toRequestData(item));
    }

    async findOneByRequestIdAndName(requestIdAndName: RequestIdAndName): Promise<RequestDataDto | null> {
        const record = await this.findRecordByRequestIdAndName(requestIdAndName);
        if (!record) {
            return null;
        }

        return this.plainTransformer.toRequestData(record);
    }

    async create(requestId: string, nameValuePair: NameValuePair): Promise<RequestDataDto> {
        const impl = async () => {
            const record = await this.prisma.requestData.create({
                data: { 
                    requestId: requestId,
                    name: nameValuePair.name,
                    value: nameValuePair.value,
                }
            });
            return this.plainTransformer.toRequestData(record);
        }

        return wrapUniqueConstraint(impl, ERROR_MESSAGES.UniqueConstraint.RequestAlreadyConnectedDataWithName);
    }

    async createMany(requestId: string, nameValuePairs: NameValuePair[]): Promise<RequestDataDto[]> {
        const impl = async () => {
            const names: string[] = [];
            const values: string[] = [];
            const records = await this.prisma.$transaction(async (tx) => {
                await tx.requestData.createMany({
                    data: nameValuePairs.map(({ name, value }) => {
                        names.push(name);
                        values.push(value);
                        return { requestId, name, value };
                    }),
                });
                return tx.requestData.findMany({
                    where: {
                        requestId: requestId,
                        name: {
                            in: names,
                        },
                        value: {
                            in: values,
                        }
                    }
                })
            });
            return records.map(item => this.plainTransformer.toRequestData(item));
        }

        return wrapUniqueConstraint(impl, ERROR_MESSAGES.UniqueConstraint.RequestAlreadyConnectedDataWithName);
    }

    async update(requestIdAndName: RequestIdAndName, value: string): Promise<RequestDataDto | null> {
        let record = await this.findRecordByRequestIdAndName(requestIdAndName);
        if (!record) {
            return null;
        }
        
        if (record.value !== value) {
            record = await this.prisma.requestData.update({
                where: {
                    requestId_name: requestIdAndName
                },
                data: {
                    value: value
                }
            });
        }

        return this.plainTransformer.toRequestData(record);
    }

    async upsert(requestId: string, nameValuePair: NameValuePair | NameValuePair[]): Promise<RequestDataDto[]> {
        const impl = async () => {
            const records = await this.prisma.$transaction(
                makeArray(nameValuePair).map(({ name, value }) => {
                    return this.prisma.requestData.upsert({
                        where: {
                            requestId_name: {
                                requestId: requestId,
                                name: name,
                            }
                        },
                        create: {
                            requestId: requestId,
                            name: name,
                            value:value,
                        },
                        update: {
                            value: value,
                        }
                    });
                })
            );

            return records.map(item => this.plainTransformer.toRequestData(item));
        }

        return wrapUniqueConstraint(impl, ERROR_MESSAGES.UniqueConstraint.RequestAlreadyConnectedDataWithName);
    }

    async deleteManyByRequestId(requestId: string): Promise<number> {
        const { count } = await this.prisma.requestData.deleteMany({
            where: {
                requestId: requestId
            }
        });
        return count;
    }

    async deleteOneByRequestIdAndName(requestIdAndName: RequestIdAndName): Promise<boolean> {
        const { count } = await this.prisma.requestData.deleteMany({
            where: {
                requestId: requestIdAndName.requestId,
                name: requestIdAndName.name,
            }
        });
        return count > 0;
    }

    private async findRecordByRequestIdAndName(requestIdAndName: RequestIdAndName) {
        return await this.prisma.requestData.findUnique({
            where: {
                requestId_name: requestIdAndName
            },
        });
    }
}