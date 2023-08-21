import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { BachelorThesisAssessmentsQueryRequest } from "../../../contracts/requests/resources/bachelor-thesis-assessments-query.request";
import { BachelorThesisAssessmentsQueryResponse } from "../../../contracts/responses/resources/bachelor-thesis-assessments-query.response";
import { BachelorThesisAssessmentDto } from "../../../shared/dtos";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../contracts/constants/error-messages";
import { BachelorThesisAssessmentCreateRequest } from "../../../contracts/requests/resources/bachelor-thesis-assessment-create.request";
import { BachelorThesisAssessmentUpdateRequest } from "../../../contracts/requests/resources/bachelor-thesis-assessment-update.request";
import { BachelorThesisAssessmentServiceInterface } from "../../interfaces";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { ForbiddenError } from "../../../contracts/errors/forbidden.error";
import { BachelorThesisAssessmentRepoInterface } from "../../../dal/interfaces";

@injectable()
export class BachelorThesisAssessmentService implements BachelorThesisAssessmentServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.BachelorThesisAssessmentRepo) private btaRepo: BachelorThesisAssessmentRepoInterface) {

    }

    async getBachelorThesisAssessments(user: AuthorizedUser, queryRequest: BachelorThesisAssessmentsQueryRequest)
        : Promise<BachelorThesisAssessmentsQueryResponse> {
            return await this.btaRepo.query(queryRequest);
    }

    async getBachelorThesisAssessment(user: AuthorizedUser, id: number): Promise<BachelorThesisAssessmentDto> {
        return await this.ensureRecordExists(id);
    }

    async createBachelorThesisAssessment(user: AuthorizedUser, createRequest: BachelorThesisAssessmentCreateRequest)
        : Promise<BachelorThesisAssessmentDto> {
        return await this.btaRepo.create(createRequest);
    }

    async updateBachelorThesisAssessment(user: AuthorizedUser, id: number, 
        updateRequest: BachelorThesisAssessmentUpdateRequest) : Promise<BachelorThesisAssessmentDto> {
        const record = await this.ensureRecordExists(id);
        this.ensureValidModification(user, record);

        const result = await this.btaRepo.update(id, updateRequest);
        return result!;
    }

    async deleteBachelorThesisAssessment(user: AuthorizedUser, id: number): Promise<void> {
        const record = await this.ensureRecordExists(id);
        this.ensureValidModification(user, record);

        await this.btaRepo.delete(id);
    }

    private async ensureRecordExists(id: number) {
        const result = await this.btaRepo.findOneById(id);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.BachelorThesisAssessmentNotFound);
        }
        return result;
    }

    private ensureValidModification(user: AuthorizedUser, record: BachelorThesisAssessmentDto) {
        const isValid = true;
        if (!isValid) {
            throw new ForbiddenError(ERROR_MESSAGES.Forbidden.BachelorThesisAssessmentDenied);
        }
    }
}