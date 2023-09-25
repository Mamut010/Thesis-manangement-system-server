import { inject, injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { AutoQueryCreatable, PrismaQueryCreatorInterface } from "../../lib/query";
import { PlainTransformerInterface } from "../utils/plain-transfomer";
import { 
    BachelorThesisEvaluationsQueryRequest,
    BachelorThesisEvaluationCreateRequest,
    BachelorThesisEvaluationUpdateRequest
} from "../../contracts/requests";
import { BachelorThesisEvaluationsQueryResponse } from "../../contracts/responses";
import { BachelorThesisEvaluation } from "../../core/models";
import { bachelorThesisEvaluationInclude } from "../constants/includes";
import { BachelorThesisEvaluationDto } from "../../shared/dtos";
import { anyChanges } from "../utils/crud-helpers";
import { wrapUniqueConstraint } from "../utils/prisma-helpers";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { BachelorThesisEvaluationRepoInterface } from "../interfaces";
import { createBachelorThesisOrOralDefenseQueryModel } from "../utils/query-helpers";

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
            const { studentId, attemptNo, ...createData } = createRequest;
            const record = await this.prisma.bachelorThesisEvaluation.create({
                data: {
                    ...createData,
                    studentAttempt: {
                        connect: {
                            studentId_attemptNo: {
                                studentId: studentId,
                                attemptNo: attemptNo
                            }
                        }
                    }
                },
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

    async delete(id: number): Promise<boolean> {
        const { count } = await this.prisma.bachelorThesisEvaluation.deleteMany({
            where: {
                id: id
            }
        });
        return count > 0;
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
            thesisTitle: 'studentAttempt.thesis.title',
            supervisorTitle: 'studentAttempt.thesis.creator.title',
        };
        const model = createBachelorThesisOrOralDefenseQueryModel(BachelorThesisEvaluation, this.queryCreator);
        return this.queryCreator.createQueryObject(model, queryRequest, { fieldMap });
    }
}