import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { BachelorThesisAssessmentsQueryRequest } from "../../../contracts/requests/resources/bachelor-thesis-assessments-query.request";
import { BachelorThesisAssessmentsQueryResponse } from "../../../contracts/responses/resources/bachelor-thesis-assessments-query.response";
import { PrismaQueryCreatorInterface } from "../../../lib/query";
import { BachelorThesisAssessmentDto } from "../../../shared/dtos";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../contracts/constants/error-messages";
import { BachelorThesisAssessmentCreateRequest } from "../../../contracts/requests/resources/bachelor-thesis-assessment-create.request";
import { BachelorThesisAssessmentUpdateRequest } from "../../../contracts/requests/resources/bachelor-thesis-assessment-update.request";
import { PlainTransformerInterface } from "../../utils/plain-transformer";
import { BachelorThesisAssessmentServiceInterface } from "../../interfaces";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { BachelorThesisAssessment } from "../../../core/models";
import { ForbiddenError } from "../../../contracts/errors/forbidden.error";
import { PlainBachelorThesisAssessment } from "../../../shared/types/plain-types";
import { anyChanges } from "../../../utils/crud-helpers";

@injectable()
export class BachelorThesisAssessmentService implements BachelorThesisAssessmentServiceInterface {
    private static readonly include = {
        student: {
            include: {
                user: true
            }
        },
        supervisor1: true,
        supervisor2: true,
        thesis: true,
    } as const;
    
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface
    ) {

    }

    async getBachelorThesisAssessments(user: AuthorizedUser, queryRequest: BachelorThesisAssessmentsQueryRequest)
        : Promise<BachelorThesisAssessmentsQueryResponse> {
        const fieldMap = {
            surname: 'student.user.surname',
            forename: 'student.user.forename',
            supervisor1Title: 'supervisor1.title',
            supervisor2Title: 'supervisor2.title',
        };
        const model = this.queryCreator.createQueryModel(BachelorThesisAssessment);
        const prismaQuery = this.queryCreator.createQueryObject(model, queryRequest, { fieldMap });

        const count = await this.prisma.bachelorThesisAssessment.count({ where: prismaQuery.where });
        const bachelorThesisAssessments = await this.prisma.bachelorThesisAssessment.findMany({
            ...prismaQuery,
            include: BachelorThesisAssessmentService.include,
        });

        const response = new BachelorThesisAssessmentsQueryResponse();
        response.content = bachelorThesisAssessments.map(item => this.plainTransformer.toBachelorThesisAssessment(item));
        response.count = count;
        return response;
    }

    async getBachelorThesisAssessment(user: AuthorizedUser, id: number): Promise<BachelorThesisAssessmentDto> {
        const bachelorThesisAssessment = await this.ensureRecordExists(id);
        return this.plainTransformer.toBachelorThesisAssessment(bachelorThesisAssessment);
    }

    async createBachelorThesisAssessment(user: AuthorizedUser, createRequest: BachelorThesisAssessmentCreateRequest)
        : Promise<BachelorThesisAssessmentDto> {
        const bachelorThesisAssessment = await this.prisma.bachelorThesisAssessment.create({
            data: createRequest,
            include: BachelorThesisAssessmentService.include
        });
        return this.plainTransformer.toBachelorThesisAssessment(bachelorThesisAssessment);
    }

    async updateBachelorThesisAssessment(user: AuthorizedUser, id: number, 
        updateRequest: BachelorThesisAssessmentUpdateRequest) : Promise<BachelorThesisAssessmentDto> {
        let record = await this.ensureRecordExists(id);
        this.ensureValidModification(user, record);

        if (anyChanges(record, updateRequest)) {
            record = await this.prisma.bachelorThesisAssessment.update({
                where: {
                    id: id
                },
                data: updateRequest,
                include: BachelorThesisAssessmentService.include
            });
        }

        return this.plainTransformer.toBachelorThesisAssessment(record);
    }

    async deleteBachelorThesisAssessment(user: AuthorizedUser, id: number): Promise<void> {
        const record = await this.ensureRecordExists(id);
        this.ensureValidModification(user, record);

        await this.prisma.bachelorThesisAssessment.delete({
            where: {
                id: id
            }
        });
    }

    private async ensureRecordExists(id: number) {
        try {
            return await this.prisma.bachelorThesisAssessment.findUniqueOrThrow({
                where: {
                    id: id
                },
                include: BachelorThesisAssessmentService.include
            });
        }
        catch {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.BachelorThesisAssessmentNotFound);
        }
    }

    private ensureValidModification(user: AuthorizedUser, record: PlainBachelorThesisAssessment) {
        const isValid = true;
        if (!isValid) {
            throw new ForbiddenError(ERROR_MESSAGES.Forbidden.BachelorThesisAssessmentDenied);
        }
    }
}