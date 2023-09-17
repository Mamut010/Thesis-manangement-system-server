import { inject, injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { AutoQueryCreatable, PrismaQueryCreatorInterface } from "../../lib/query";
import { PlainTransformerInterface } from "../utils/plain-transfomer";
import { 
    OralDefenseAssessmentsQueryRequest, 
    OralDefenseAssessmentCreateRequest,
    OralDefenseAssessmentUpdateRequest
} from "../../contracts/requests";
import { OralDefenseAssessmentsQueryResponse } from "../../contracts/responses";
import { OralDefenseAssessment } from "../../core/models";
import { bachelorThesisAndOralDefenseInclude } from "../constants/includes";
import { OralDefenseAssessmentDto } from "../../shared/dtos";
import { anyChanges } from "../utils/crud-helpers";
import { wrapUniqueConstraint } from "../utils/prisma-helpers";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { OralDefenseAssessmentRepoInterface } from "../interfaces";
import { createBachelorThesisOrOralDefenseQueryModel, createLecturerAssetsQuery } from "../utils/query-helpers";

@injectable()
export class OralDefenseAssessmentRepo implements OralDefenseAssessmentRepoInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface
    ) {

    }

    async query(queryRequest: OralDefenseAssessmentsQueryRequest): Promise<OralDefenseAssessmentsQueryResponse> {
        const prismaQuery = this.createPrismaQuery(queryRequest);

        const count = await this.prisma.oralDefenseAssessment.count({ where: prismaQuery.where });
        const records = await this.prisma.oralDefenseAssessment.findMany({
            ...prismaQuery,
            include:  bachelorThesisAndOralDefenseInclude,
        });

        const response = new OralDefenseAssessmentsQueryResponse();
        response.content = records.map(item => this.plainTransformer.toOralDefenseAssessment(item));
        response.count = count;
        return response;
    }

    async findOneById(id: number): Promise<OralDefenseAssessmentDto | null> {
        const record = await this.findRecordById(id);
        if (!record) {
            return null;
        }
        return this.plainTransformer.toOralDefenseAssessment(record);
    }

    async create(createRequest: OralDefenseAssessmentCreateRequest): Promise<OralDefenseAssessmentDto> {
        const impl = async () => {
            const { studentId, attemptNo, ...createData } = createRequest;
            const record = await this.prisma.oralDefenseAssessment.create({
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
            return this.plainTransformer.toOralDefenseAssessment(record);
        }

        return wrapUniqueConstraint(impl, ERROR_MESSAGES.UniqueConstraint.StudentAlreadyConnectedOralDefenseAssessment);
    }

    async update(id: number, updateRequest: OralDefenseAssessmentUpdateRequest)
        : Promise<OralDefenseAssessmentDto | null> {
        const impl = async () => {
            let record = await this.findRecordById(id);
            if (!record) {
                return null;
            }

            if (anyChanges(record, updateRequest)) {
                record = await this.prisma.oralDefenseAssessment.update({
                    where: {
                        id: id
                    },
                    data: updateRequest,
                    include:  bachelorThesisAndOralDefenseInclude
                });
            }
    
            return this.plainTransformer.toOralDefenseAssessment(record);
        }

        return wrapUniqueConstraint(impl, ERROR_MESSAGES.UniqueConstraint.StudentAlreadyConnectedOralDefenseAssessment);
    }

    async delete(id: number): Promise<boolean> {
        const { count } = await this.prisma.oralDefenseAssessment.deleteMany({
            where: {
                id: id
            }
        });
        return count > 0;
    }

    async queryLecturerAssets(lecturerId: string, queryRequest: OralDefenseAssessmentsQueryRequest)
        : Promise<OralDefenseAssessmentsQueryResponse> {
        const prismaQuery = this.createPrismaQuery(queryRequest);
        const assetsQuery = createLecturerAssetsQuery(lecturerId, prismaQuery);

        const count = await this.prisma.oralDefenseAssessment.count({ where: assetsQuery.where });
        const records = await this.prisma.oralDefenseAssessment.findMany({
            ...assetsQuery,
            include: bachelorThesisAndOralDefenseInclude,
        });

        return {
            count,
            content: records.map(item => this.plainTransformer.toOralDefenseAssessment(item)),
        }
    }
    
    private async findRecordById(id: number) {
        return await this.prisma.oralDefenseAssessment.findUnique({
            where: {
                id: id
            },
            include:  bachelorThesisAndOralDefenseInclude
        });
    }

    private createPrismaQuery(queryRequest: AutoQueryCreatable) {
        const fieldMap = {
            thesisTitle: 'studentAttempt.thesis.title',
            supervisor1Title: 'studentAttempt.thesis.creator.title',
            supervisor2Title: 'studentAttempt.supervisor2.title',
        };
        const model = createBachelorThesisOrOralDefenseQueryModel(OralDefenseAssessment, this.queryCreator);
        return this.queryCreator.createQueryObject(model, queryRequest, { fieldMap });
    }
}