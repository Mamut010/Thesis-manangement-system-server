import { inject, injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { AutoQueryCreatable, PrismaQueryCreatorInterface } from "../../lib/query";
import { PlainTransformerInterface } from "../utils/plain-transfomer";
import { BachelorThesisAssessmentsQueryRequest } from "../../contracts/requests/resources/bachelor-thesis-assessments-query.request";
import { BachelorThesisAssessmentsQueryResponse } from "../../contracts/responses/resources/bachelor-thesis-assessments-query.response";
import { BachelorThesisAssessment } from "../../core/models";
import { bachelorThesisAndOralDefenseInclude } from "../constants/includes";
import { BachelorThesisAssessmentDto } from "../../shared/dtos";
import { BachelorThesisAssessmentCreateRequest } from "../../contracts/requests/resources/bachelor-thesis-assessment-create.request";
import { BachelorThesisAssessmentUpdateRequest } from "../../contracts/requests/resources/bachelor-thesis-assessment-update.request";
import { anyChanges } from "../utils/crud-helpers";
import { wrapUniqueConstraint } from "../utils/prisma-helpers";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { BachelorThesisAssessmentRepoInterface } from "../interfaces";
import { getLecturerAssetsQuery } from "../utils/lecturer-assets-helpers";

@injectable()
export class BachelorThesisAssessmentRepo implements BachelorThesisAssessmentRepoInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface
    ) {

    }

    async query(queryRequest: BachelorThesisAssessmentsQueryRequest): Promise<BachelorThesisAssessmentsQueryResponse> {
        const prismaQuery = this.createPrismaQuery(queryRequest);

        const count = await this.prisma.bachelorThesisAssessment.count({ where: prismaQuery.where });
        const records = await this.prisma.bachelorThesisAssessment.findMany({
            ...prismaQuery,
            include:  bachelorThesisAndOralDefenseInclude,
        });

        const response = new BachelorThesisAssessmentsQueryResponse();
        response.content = records.map(item => this.plainTransformer.toBachelorThesisAssessment(item));
        response.count = count;
        return response;
    }

    async findOneById(id: number): Promise<BachelorThesisAssessmentDto | null> {
        const record = await this.findRecordById(id);
        if (!record) {
            return null;
        }
        return this.plainTransformer.toBachelorThesisAssessment(record);
    }

    async create(createRequest: BachelorThesisAssessmentCreateRequest): Promise<BachelorThesisAssessmentDto> {
        const impl = async () => {
            const record = await this.prisma.bachelorThesisAssessment.create({
                data: createRequest,
                include:  bachelorThesisAndOralDefenseInclude
            });
            return this.plainTransformer.toBachelorThesisAssessment(record);
        }

        return wrapUniqueConstraint(impl, ERROR_MESSAGES.UniqueConstraint.StudentAlreadyConnectedBachelorThesisAssessment);
    }

    async update(id: number, updateRequest: BachelorThesisAssessmentUpdateRequest)
        : Promise<BachelorThesisAssessmentDto | null> {
        const impl = async () => {
            let record = await this.findRecordById(id);
            if (!record) {
                return null;
            }

            if (anyChanges(record, updateRequest)) {
                record = await this.prisma.bachelorThesisAssessment.update({
                    where: {
                        id: id
                    },
                    data: updateRequest,
                    include:  bachelorThesisAndOralDefenseInclude
                });
            }
    
            return this.plainTransformer.toBachelorThesisAssessment(record);
        }

        return wrapUniqueConstraint(impl, ERROR_MESSAGES.UniqueConstraint.StudentAlreadyConnectedBachelorThesisAssessment);
    }

    async delete(id: number): Promise<boolean> {
        const { count } = await this.prisma.bachelorThesisRegistration.deleteMany({
            where: {
                id: id
            }
        });
        return count > 0;
    }

    async queryLecturerAssets(lecturerId: string, queryRequest: BachelorThesisAssessmentsQueryRequest)
        : Promise<BachelorThesisAssessmentDto[]> {
        const prismaQuery = this.createPrismaQuery(queryRequest);
        const records = await this.prisma.bachelorThesisAssessment.findMany(getLecturerAssetsQuery(lecturerId, prismaQuery));
        return records.map(item => this.plainTransformer.toBachelorThesisAssessment(item));
    }
    
    private async findRecordById(id: number) {
        return await this.prisma.bachelorThesisAssessment.findUnique({
            where: {
                id: id
            },
            include:  bachelorThesisAndOralDefenseInclude
        });
    }

    private createPrismaQuery(queryRequest: AutoQueryCreatable) {
        const fieldMap = {
            surname: 'student.surname',
            forename: 'student.forename',
            thesisTitle: 'thesis.title',
            supervisor1Title: 'supervisor1.title',
            supervisor2Title: 'supervisor2.title',
        };
        const model = this.queryCreator.createQueryModel(BachelorThesisAssessment);
        return this.queryCreator.createQueryObject(model, queryRequest, { fieldMap });
    }
}