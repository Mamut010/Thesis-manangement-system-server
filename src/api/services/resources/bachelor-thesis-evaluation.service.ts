import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { BachelorThesisEvaluationsQueryRequest } from "../../../contracts/requests/resources/bachelor-thesis-evaluations-query.request";
import { BachelorThesisEvaluationsQueryResponse } from "../../../contracts/responses/resources/bachelor-thesis-evaluations-query.response";
import { PrismaQueryCreatorInterface } from "../../../lib/query";
import { BachelorThesisEvaluationDto } from "../../../shared/dtos";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../contracts/constants/error-messages";
import { BachelorThesisEvaluationCreateRequest } from "../../../contracts/requests/resources/bachelor-thesis-evaluation-create.request";
import { BachelorThesisEvaluationUpdateRequest } from "../../../contracts/requests/resources/bachelor-thesis-evaluation-update.request";
import { PlainTransformerInterface } from "../../../shared/utils/plain-transformer";
import { BachelorThesisEvaluationServiceInterface } from "../../interfaces";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { BachelorThesisEvaluation } from "../../../core/models";
import { ForbiddenError } from "../../../contracts/errors/forbidden.error";
import { PlainBachelorThesisEvaluation } from "../../../shared/types/plain-types";
import { anyChanges } from "../../../utils/crud-helpers";

@injectable()
export class BachelorThesisEvaluationService implements BachelorThesisEvaluationServiceInterface {
    private static readonly include = {
        student: {
            include: {
                user: true
            }
        },
        supervisor: true,
        thesis: true,
    } as const;
    
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface
    ) {

    }

    async getBachelorThesisEvaluations(user: AuthorizedUser, queryRequest: BachelorThesisEvaluationsQueryRequest)
        : Promise<BachelorThesisEvaluationsQueryResponse> {
        const fieldMap = {
            surname: 'student.user.surname',
            forename: 'student.user.forename',
            thesisTitle: 'thesis.title',
            supervisorTitle: 'supervisor.title',
        };
        const model = this.queryCreator.createQueryModel(BachelorThesisEvaluation);
        const prismaQuery = this.queryCreator.createQueryObject(model, queryRequest, { fieldMap });

        const count = await this.prisma.bachelorThesisEvaluation.count({ where: prismaQuery.where });
        const bachelorThesisEvaluations = await this.prisma.bachelorThesisEvaluation.findMany({
            ...prismaQuery,
            include: BachelorThesisEvaluationService.include,
        });

        const response = new BachelorThesisEvaluationsQueryResponse();
        response.content = bachelorThesisEvaluations.map(item => this.plainTransformer.toBachelorThesisEvaluation(item));
        response.count = count;
        return response;
    }

    async getBachelorThesisEvaluation(user: AuthorizedUser, id: number): Promise<BachelorThesisEvaluationDto> {
        const bachelorThesisEvaluation = await this.ensureRecordExists(id);
        return this.plainTransformer.toBachelorThesisEvaluation(bachelorThesisEvaluation);
    }

    async createBachelorThesisEvaluation(user: AuthorizedUser, createRequest: BachelorThesisEvaluationCreateRequest)
        : Promise<BachelorThesisEvaluationDto> {
        const bachelorThesisEvaluation = await this.prisma.bachelorThesisEvaluation.create({
            data: createRequest,
            include: BachelorThesisEvaluationService.include
        });
        return this.plainTransformer.toBachelorThesisEvaluation(bachelorThesisEvaluation);
    }

    async updateBachelorThesisEvaluation(user: AuthorizedUser, id: number, 
        updateRequest: BachelorThesisEvaluationUpdateRequest) : Promise<BachelorThesisEvaluationDto> {
        let record = await this.ensureRecordExists(id);
        this.ensureValidModification(user, record);

        if (anyChanges(record, updateRequest)) {
            record = await this.prisma.bachelorThesisEvaluation.update({
                where: {
                    id: id
                },
                data: updateRequest,
                include: BachelorThesisEvaluationService.include
            });
        }

        return this.plainTransformer.toBachelorThesisEvaluation(record);
    }

    async deleteBachelorThesisEvaluation(user: AuthorizedUser, id: number): Promise<void> {
        const record = await this.ensureRecordExists(id);
        this.ensureValidModification(user, record);

        await this.prisma.bachelorThesisEvaluation.delete({
            where: {
                id: id
            }
        });
    }

    private async ensureRecordExists(id: number) {
        try {
            return await this.prisma.bachelorThesisEvaluation.findUniqueOrThrow({
                where: {
                    id: id
                },
                include: BachelorThesisEvaluationService.include
            });
        }
        catch {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.BachelorThesisEvaluationNotFound);
        }
    }

    private ensureValidModification(user: AuthorizedUser, record: PlainBachelorThesisEvaluation) {
        const isValid = true;
        if (!isValid) {
            throw new ForbiddenError(ERROR_MESSAGES.Forbidden.BachelorThesisEvaluationDenied);
        }
    }
}