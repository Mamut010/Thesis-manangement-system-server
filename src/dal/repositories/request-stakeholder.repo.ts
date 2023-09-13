import { inject, injectable } from "inversify";
import { RequestStakeholderRepoInterface } from "../interfaces";
import { PrismaClient } from "@prisma/client";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PlainTransformerInterface } from "../utils/plain-transfomer";
import { RequestStakeholderDto } from "../../shared/dtos";
import { RequestGroupStakeholdersUpdateRequest, RequestUserStakeholdersUpdateRequest } from "../../contracts/requests";
import { arrayIntersection, getNonNullableKeys, makeArray, removeSharedElements, uniqueFrom } from "../../utils/array-helpers";
import { requestStakeholderInclude } from "../constants/includes";
import { PrismaClientLike } from "../../utils/types";
import { RequestStakeholderKey } from "../types/utility-types";

@injectable()
export class RequestStakeholderRepo implements RequestStakeholderRepoInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
    ) {

    }

    async getStakeholders(requestId: string): Promise<RequestStakeholderDto | null> {
        if(!await this.doesRequestExists(requestId)) {
            return null;
        }

        const records = await this.findRecordsByRequestId(requestId);
        return this.plainTransformer.toRequestStakeholder(requestId, records);
    }

    async updateUserStakeholders(requestId: string, updateRequest: RequestUserStakeholdersUpdateRequest)
        : Promise<RequestStakeholderDto | null> {
        return await this.updateStakeholders('userId', requestId, 
            updateRequest.addedUserIds, updateRequest.removedUserIds, updateRequest.acceptedIds);
    }

    async updateGroupStakeholders(requestId: string, updateRequest: RequestGroupStakeholdersUpdateRequest)
        : Promise<RequestStakeholderDto | null> {
        return await this.updateStakeholders('groupId', requestId, 
            updateRequest.addedGroupIds, updateRequest.removedGroupIds, updateRequest.acceptedIds);
    }

    async setStakeholdersAccepted(requestId: string, id: string | string[], accepted: boolean)
        : Promise<RequestStakeholderDto | null> {
        return await this.setAccepted(true, requestId, id, accepted);
    }

    async setUserStakeholderAccepted(requestId: string, userId: string | string[], accepted: boolean)
        : Promise<RequestStakeholderDto | null> {
        return await this.setAccepted('userId', requestId, userId, accepted);
    }

    async setGroupStakeholderAccepted(requestId: string, groupId: string | string[], accepted: boolean)
        : Promise<RequestStakeholderDto | null> {
        return await this.setAccepted('groupId', requestId, groupId, accepted);
    }

    private async updateStakeholders(key: RequestStakeholderKey, requestId: string, 
        addedIds?: string[], removedIds?: string[], acceptedIds?: string[]): Promise<RequestStakeholderDto | null> {
        if(!await this.doesRequestExists(requestId)) {
            return null;
        }

        const { arr1, arr2 } =  removeSharedElements(addedIds, removedIds);
        addedIds = arr1 ?? [];
        removedIds = arr2 ?? [];

        let records = await this.findAlreadyAddedOrReadyToRemoveRecords(key, requestId, addedIds, removedIds);
        const keys = getNonNullableKeys(records, item => item[key]);

        addedIds = uniqueFrom(addedIds, keys);
        removedIds = arrayIntersection(removedIds, keys);

        if (addedIds.length === 0 && removedIds.length === 0) {
            return this.plainTransformer.toRequestStakeholder(requestId, records);
        }

        const acceptedIdSet = new Set(acceptedIds);

        [,,records] = await this.prisma.$transaction([
            this.prisma.requestStakeholder.createMany({
                data: addedIds.map(item => {
                    return {
                        requestId,
                        [key]: item,
                        isAccepted: acceptedIdSet.has(item)
                    }
                }),
            }),
            this.prisma.requestStakeholder.deleteMany({
                where: {
                    [key]: {
                        in: removedIds
                    }
                }
            }),
            this.findRecordsByRequestId(requestId),
        ]);

        return this.plainTransformer.toRequestStakeholder(requestId, records);
    }

    private async setAccepted(key: RequestStakeholderKey | true, requestId: string, id: string | string[], accepted: boolean)
        : Promise<RequestStakeholderDto | null> {
        if(!await this.doesRequestExists(requestId)) {
            return null;
        }

        const ids = makeArray(id);
        
        const records = await this.prisma.$transaction(async (tx) => {
            if (key === true) {
                await this.prisma.requestStakeholder.updateMany({
                    where: {
                        requestId,
                        OR: RequestStakeholderKey.map(key => ({
                            [key]: {
                                in: ids
                            }
                        }))
                    },
                    data: {
                        isAccepted: accepted
                    }
                });
            }
            else {
                await this.prisma.requestStakeholder.updateMany({
                    where: {
                        requestId,
                        [key]: {
                            in: ids
                        }
                    },
                    data: {
                        isAccepted: accepted
                    }
                });
            }

            return this.findRecordsByRequestId(requestId, tx);
        });

        return this.plainTransformer.toRequestStakeholder(requestId, records);
    }

    private async doesRequestExists(requestId: string) {
        const request = await this.prisma.request.findUnique({ 
            where: {
                id: requestId
            } 
        });
        return request !== null;
    }

    private findRecordsByRequestId(requestId: string, prisma: PrismaClientLike = this.prisma) {
        return prisma.requestStakeholder.findMany({
            where: {
                requestId
            },
            include: requestStakeholderInclude,
        })
    }

    private findAlreadyAddedOrReadyToRemoveRecords(key: RequestStakeholderKey, requestId: string, addedIds: string[], 
        removedIds: string[]) {
        return this.prisma.requestStakeholder.findMany({
            where: {
                requestId,
                OR: [
                    {
                        [key]: {
                            in: addedIds
                        }
                    },
                    {
                        [key]: {
                            in: removedIds
                        }
                    }
                ]
            },
            include: requestStakeholderInclude
        });
    }
}