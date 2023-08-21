import { inject, injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { AutoQueryCreatable, PrismaQueryCreatorInterface } from "../../lib/query";
import { PlainTransformerInterface } from "../../shared/utils/plain-transformer";
import { BachelorThesisEvaluationsQueryRequest } from "../../contracts/requests/resources/bachelor-thesis-evaluations-query.request";
import { BachelorThesisEvaluationsQueryResponse } from "../../contracts/responses/resources/bachelor-thesis-evaluations-query.response";
import { BachelorThesisEvaluation } from "../../core/models";
import { bachelorThesisEvaluationInclude } from "../../shared/constants/includes";
import { BachelorThesisEvaluationDto } from "../../shared/dtos";
import { BachelorThesisEvaluationCreateRequest } from "../../contracts/requests/resources/bachelor-thesis-evaluation-create.request";
import { BachelorThesisEvaluationUpdateRequest } from "../../contracts/requests/resources/bachelor-thesis-evaluation-update.request";
import { anyChanges } from "../../utils/crud-helpers";
import { wrapUniqueConstraint } from "../../utils/prisma-helpers";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { BachelorThesisEvaluationRepoInterface } from "../interfaces";
import { LecturerAssetsQueryRequest } from "../../contracts/requests/lecturer-assets-query.request";

@injectable()
export class BachelorThesisEvaluationRepo implements BachelorThesisEvaluationRepoInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface
    ) {

    }

    async query(queryRequest: BachelorThesisEvaluationsQueryRequest): Promise<BachelorThesisEvaluationsQueryResponse> {
        const prismaQuery = this.createPrismaQuery(queryRequest);

        const count = await this.prisma.bachelorThesisEvaluation.count({ where: prismaQuery.where });
        const records = await this.prisma.bachelorThesisEvaluation.findMany({
            ...prismaQuery,
            include:  bachelorThesisEvaluationInclude,
        });

        const response = new BachelorThesisEvaluationsQueryResponse();
        response.content = records.map(item => this.plainTransformer.toBachelorThesisEvaluation(item));
        response.count = count;
        return response;
    }

    async findOneById(id: number): Promise<BachelorThesisEvaluationDto | null> {
        const record = await this.findRecordById(id);
        if (!record) {
            return null;
        }
        return this.plainTransformer.toBachelorThesisEvaluation(record);
    }

    async create(createRequest: BachelorThesisEvaluationCreateRequest): Promise<BachelorThesisEvaluationDto> {
        const impl = async () => {
            const record = await this.prisma.bachelorThesisEvaluation.create({
                data: createRequest,
                include:  bachelorThesisEvaluationInclude
            });
            return this.plainTransformer.toBachelorThesisEvaluation(record);
        }

        return wrapUniqueConstraint(impl, ERROR_MESSAGES.UniqueConstraint.StudentAlreadyConnectedBachelorThesisEvaluation);
    }

    async update(id: number, updateRequest: BachelorThesisEvaluationUpdateRequest)
        : Promise<BachelorThesisEvaluationDto | null> {
        const impl = async () => {
            let record = await this.findRecordById(id);
            if (!record) {
                return null;
            }

            if (anyChanges(record, updateRequest)) {
                record = await this.prisma.bachelorThesisEvaluation.update({
                    where: {
                        id: id
                    },
                    data: updateRequest,
                    include:  bachelorThesisEvaluationInclude
                });
            }
    
            return this.plainTransformer.toBachelorThesisEvaluation(record);
        }

        return wrapUniqueConstraint(impl, ERROR_MESSAGES.UniqueConstraint.StudentAlreadyConnectedBachelorThesisEvaluation);
    }

    async delete(id: number): Promise<void> {
        await this.prisma.bachelorThesisEvaluation.delete({
            where: {
                id: id
            }
        });
    }

    async queryLecturerAssets(lecturerId: string, queryRequest: LecturerAssetsQueryRequest)
        : Promise<BachelorThesisEvaluationDto[]> {
        const prismaQuery = this.createPrismaQuery(queryRequest);

        const records = await this.prisma.bachelorThesisEvaluation.findMany({
            where: {
                supervisorId: lecturerId,
            },
            include: bachelorThesisEvaluationInclude,
            orderBy: prismaQuery.orderBy,
            skip: prismaQuery.skip,
            take: prismaQuery.take,
        });

        return records.map(item => this.plainTransformer.toBachelorThesisEvaluation(item));
    }
    
    private async findRecordById(id: number) {
        return await this.prisma.bachelorThesisEvaluation.findUnique({
            where: {
                id: id
            },
            include:  bachelorThesisEvaluationInclude
        });
    }

    private createPrismaQuery(queryRequest: AutoQueryCreatable) {
        const fieldMap = {
            surname: 'student.user.surname',
            forename: 'student.user.forename',
            thesisTitle: 'thesis.title',
            supervisorTitle: 'supervisor.title',
        };
        const model = this.queryCreator.createQueryModel(BachelorThesisEvaluation);
        return this.queryCreator.createQueryObject(model, queryRequest, { fieldMap });
    }
}