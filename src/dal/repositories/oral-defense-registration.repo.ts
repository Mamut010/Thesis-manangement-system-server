import { inject, injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { AutoQueryCreatable, PrismaQueryCreatorInterface } from "../../lib/query";
import { PlainTransformerInterface } from "../utils/plain-transfomer";
import { 
    OralDefenseRegistrationsQueryRequest, 
    OralDefenseRegistrationCreateRequest, 
    OralDefenseRegistrationUpdateRequest
} from "../../contracts/requests";
import { OralDefenseRegistrationsQueryResponse } from "../../contracts/responses";
import { OralDefenseRegistration } from "../../core/models";
import { OralDefenseRegistrationDto } from "../../shared/dtos";
import { anyChanges } from "../utils/crud-helpers";
import { wrapUniqueConstraint } from "../utils/prisma-helpers";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { OralDefenseRegistrationRepoInterface } from "../interfaces";
import { createBachelorThesisOrOralDefenseQueryModel, createLecturerAssetsQuery } from "../utils/query-helpers";
import { bachelorThesisAndOralDefenseInclude } from "../constants/includes";

@injectable()
export class OralDefenseRegistrationRepo implements OralDefenseRegistrationRepoInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface
    ) {

    }

    async query(queryRequest: OralDefenseRegistrationsQueryRequest): Promise<OralDefenseRegistrationsQueryResponse> {
        const prismaQuery = this.createPrismaQuery(queryRequest);

        const count = await this.prisma.oralDefenseRegistration.count({ where: prismaQuery.where });
        const records = await this.prisma.oralDefenseRegistration.findMany({
            ...prismaQuery,
            include: bachelorThesisAndOralDefenseInclude,
        });

        const response = new OralDefenseRegistrationsQueryResponse();
        response.content = records.map(item => this.plainTransformer.toOralDefenseRegistration(item));
        response.count = count;
        return response;
    }

    async findOneById(id: number): Promise<OralDefenseRegistrationDto | null> {
        const record = await this.findRecordById(id);
        if (!record) {
            return null;
        }
        return this.plainTransformer.toOralDefenseRegistration(record);
    }

    async create(createRequest: OralDefenseRegistrationCreateRequest): Promise<OralDefenseRegistrationDto> {
        const impl = async () => {
            const { studentId, attemptNo, ...createData } = createRequest;
            const record = await this.prisma.oralDefenseRegistration.create({
                data: {
                    ...createData,
                    studentAttempt: {
                        connect: {
                            studentId_attemptNo: {
                                studentId: studentId,
                                attemptNo: attemptNo
                            }
                        }
                    },
                },
                include: bachelorThesisAndOralDefenseInclude,
            });
            return this.plainTransformer.toOralDefenseRegistration(record);
        }

        return wrapUniqueConstraint(impl, ERROR_MESSAGES.UniqueConstraint.StudentAlreadyConnectedOralDefenseRegistration);
    }

    async update(id: number, updateRequest: OralDefenseRegistrationUpdateRequest)
        : Promise<OralDefenseRegistrationDto | null> {
        const impl = async () => {
            let record = await this.findRecordById(id);
            if (!record) {
                return null;
            }

            if (anyChanges(record, updateRequest)) {
                record = await this.prisma.oralDefenseRegistration.update({
                    where: {
                        id: id
                    },
                    data: updateRequest,
                    include: bachelorThesisAndOralDefenseInclude
                });
            }
    
            return this.plainTransformer.toOralDefenseRegistration(record);
        }

        return wrapUniqueConstraint(impl, ERROR_MESSAGES.UniqueConstraint.StudentAlreadyConnectedOralDefenseRegistration);
    }

    async delete(id: number): Promise<boolean> {
        const { count } = await this.prisma.oralDefenseRegistration.deleteMany({
            where: {
                id: id
            }
        });
        return count > 0;
    }

    async queryLecturerAssets(lecturerId: string, queryRequest: OralDefenseRegistrationsQueryRequest)
        : Promise<OralDefenseRegistrationDto[]> {
        const prismaQuery = this.createPrismaQuery(queryRequest);
        const assetsQuery = createLecturerAssetsQuery(lecturerId, prismaQuery);
        const records = await this.prisma.oralDefenseRegistration.findMany({
            ...assetsQuery,
            include: bachelorThesisAndOralDefenseInclude,
        });
        return records.map(item => this.plainTransformer.toOralDefenseRegistration(item));
    }
    
    private async findRecordById(id: number) {
        return await this.prisma.oralDefenseRegistration.findUnique({
            where: {
                id: id
            },
            include: bachelorThesisAndOralDefenseInclude
        });
    }

    private createPrismaQuery(queryRequest: AutoQueryCreatable) {
        const fieldMap = {
            thesisTitle: 'studentAttempt.thesis.title',
            supervisor1Title: 'studentAttempt.thesis.creator.title',
            supervisor2Title: 'studentAttempt.supervisor2.title',
        };
        const model = createBachelorThesisOrOralDefenseQueryModel(OralDefenseRegistration, this.queryCreator);
        return this.queryCreator.createQueryObject(model, queryRequest, { fieldMap });
    }
}