import { inject, injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { AutoQueryCreatable, PrismaQueryCreatorInterface } from "../../lib/query";
import { PlainTransformerInterface } from "../utils/plain-transfomer";
import { 
    BachelorThesisRegistrationsQueryRequest,
    BachelorThesisRegistrationCreateRequest,
    BachelorThesisRegistrationUpdateRequest
} from "../../contracts/requests";
import { BachelorThesisRegistrationsQueryResponse } from "../../contracts/responses";
import { BachelorThesisRegistration } from "../../core/models";
import { bachelorThesisAndOralDefenseWithProgramInclude } from "../constants/includes";
import { BachelorThesisRegistrationDto } from "../../shared/dtos";
import { anyChanges } from "../utils/crud-helpers";
import { wrapUniqueConstraint } from "../utils/prisma-helpers";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { BachelorThesisRegistrationRepoInterface } from "../interfaces";
import { createBachelorThesisOrOralDefenseQueryModel, createLecturerAssetsQuery } from "../utils/query-helpers";

@injectable()
export class BachelorThesisRegistrationRepo implements BachelorThesisRegistrationRepoInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface
    ) {

    }

    async query(queryRequest: BachelorThesisRegistrationsQueryRequest): Promise<BachelorThesisRegistrationsQueryResponse> {
        const prismaQuery = this.createPrismaQuery(queryRequest);

        const count = await this.prisma.bachelorThesisRegistration.count({ where: prismaQuery.where });
        const records = await this.prisma.bachelorThesisRegistration.findMany({
            ...prismaQuery,
            include: bachelorThesisAndOralDefenseWithProgramInclude,
        });

        const response = new BachelorThesisRegistrationsQueryResponse();
        response.content = records.map(item => this.plainTransformer.toBachelorThesisRegistration(item));
        response.count = count;
        return response;
    }

    async findOneById(id: number): Promise<BachelorThesisRegistrationDto | null> {
        const record = await this.findRecordById(id);
        if (!record) {
            return null;
        }
        return this.plainTransformer.toBachelorThesisRegistration(record);
    }

    async create(createRequest: BachelorThesisRegistrationCreateRequest): Promise<BachelorThesisRegistrationDto> {
        const impl = async () => {
            const { studentId, attemptNo, ...createData } = createRequest;
            const record = await this.prisma.bachelorThesisRegistration.create({
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
                include: bachelorThesisAndOralDefenseWithProgramInclude,
            });
            return this.plainTransformer.toBachelorThesisRegistration(record);
        }

        return wrapUniqueConstraint(impl, ERROR_MESSAGES.UniqueConstraint.StudentAlreadyConnectedBachelorThesisRegistration);
    }

    async update(id: number, updateRequest: BachelorThesisRegistrationUpdateRequest)
        : Promise<BachelorThesisRegistrationDto | null> {
        const impl = async () => {
            let record = await this.findRecordById(id);
            if (!record) {
                return null;
            }

            if (anyChanges(record, updateRequest)) {
                record = await this.prisma.bachelorThesisRegistration.update({
                    where: {
                        id: id,
                    },
                    data: updateRequest,
                    include: bachelorThesisAndOralDefenseWithProgramInclude,
                });
            }
    
            return this.plainTransformer.toBachelorThesisRegistration(record);
        }

        return wrapUniqueConstraint(impl, ERROR_MESSAGES.UniqueConstraint.StudentAlreadyConnectedBachelorThesisRegistration);
    }

    async delete(id: number): Promise<boolean> {
        const { count } = await this.prisma.bachelorThesisRegistration.deleteMany({
            where: {
                id: id
            }
        });
        return count > 0;
    }

    async queryLecturerAssets(lecturerId: string, queryRequest: BachelorThesisRegistrationsQueryRequest)
        : Promise<BachelorThesisRegistrationsQueryResponse> {
        const prismaQuery = this.createPrismaQuery(queryRequest);
        const assetsQuery = createLecturerAssetsQuery(lecturerId, prismaQuery);

        const count = await this.prisma.bachelorThesisRegistration.count({ where: assetsQuery.where });
        const records = await this.prisma.bachelorThesisRegistration.findMany({
            ...assetsQuery,
            include: bachelorThesisAndOralDefenseWithProgramInclude,
        });
        
        return {
            count,
            content: records.map(item => this.plainTransformer.toBachelorThesisRegistration(item)),
        }
    }
    
    private async findRecordById(id: number) {
        return await this.prisma.bachelorThesisRegistration.findUnique({
            where: {
                id: id
            },
            include: bachelorThesisAndOralDefenseWithProgramInclude,
        });
    }

    private createPrismaQuery(queryRequest: AutoQueryCreatable) {
        const fieldMap = {
            thesisTitle: 'studentAttempt.thesis.title',
            supervisor1Title: 'studentAttempt.thesis.creator.title',
            supervisor2Title: 'studentAttempt.supervisor2.title',
        };
        const model = createBachelorThesisOrOralDefenseQueryModel(BachelorThesisRegistration, this.queryCreator);
        return this.queryCreator.createQueryObject(model, queryRequest, { fieldMap });
    }
}