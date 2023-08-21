import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { OralDefenseAssessmentsQueryRequest } from "../../../contracts/requests/resources/oral-defense-assessments-query.request";
import { OralDefenseAssessmentsQueryResponse } from "../../../contracts/responses/resources/oral-defense-assessments-query.response";
import { PrismaQueryCreatorInterface } from "../../../lib/query";
import { OralDefenseAssessmentDto } from "../../../shared/dtos";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../contracts/constants/error-messages";
import { OralDefenseAssessmentCreateRequest } from "../../../contracts/requests/resources/oral-defense-assessment-create.request";
import { OralDefenseAssessmentUpdateRequest } from "../../../contracts/requests/resources/oral-defense-assessment-update.request";
import { PlainTransformerInterface } from "../../../shared/utils/plain-transformer";
import { OralDefenseAssessmentServiceInterface } from "../../interfaces";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { OralDefenseAssessment } from "../../../core/models";
import { ForbiddenError } from "../../../contracts/errors/forbidden.error";
import { PlainOralDefenseAssessment } from "../../../shared/types/plain-types";
import { anyChanges } from "../../../utils/crud-helpers";
import { bachelorThesisAndOralDefenseInclude } from "../../../dal/constants/includes";
import { OralDefenseAssessmentRepoInterface } from "../../../dal/interfaces";

@injectable()
export class OralDefenseAssessmentService implements OralDefenseAssessmentServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface,
        @inject(INJECTION_TOKENS.OralDefenseAssessmentRepo) private odaRepo: OralDefenseAssessmentRepoInterface) {

    }

    async getOralDefenseAssessments(user: AuthorizedUser, queryRequest: OralDefenseAssessmentsQueryRequest)
        : Promise<OralDefenseAssessmentsQueryResponse> {
        return await this.odaRepo.query(queryRequest);
    }

    async getOralDefenseAssessment(user: AuthorizedUser, id: number): Promise<OralDefenseAssessmentDto> {
        return await this.ensureRecordExists(id);
    }

    async createOralDefenseAssessment(user: AuthorizedUser, createRequest: OralDefenseAssessmentCreateRequest)
        : Promise<OralDefenseAssessmentDto> {
        return await this.odaRepo.create(createRequest);
    }

    async updateOralDefenseAssessment(user: AuthorizedUser, id: number, 
        updateRequest: OralDefenseAssessmentUpdateRequest) : Promise<OralDefenseAssessmentDto> {
        const record = await this.ensureRecordExists(id);
        this.ensureValidModification(user, record);

        const result = await this.odaRepo.update(id, updateRequest);
        return result!;
    }

    async deleteOralDefenseAssessment(user: AuthorizedUser, id: number): Promise<void> {
        const record = await this.ensureRecordExists(id);
        this.ensureValidModification(user, record);

        await this.odaRepo.delete(id);
    }

    private async ensureRecordExists(id: number) {
        const result = await this.odaRepo.findOneById(id);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.OralDefenseAssessmentNotFound);
        }
        return result;
    }

    private ensureValidModification(user: AuthorizedUser, record: OralDefenseAssessmentDto) {
        const isValid = true;
        if (!isValid) {
            throw new ForbiddenError(ERROR_MESSAGES.Forbidden.OralDefenseAssessmentDenied);
        }
    }
}