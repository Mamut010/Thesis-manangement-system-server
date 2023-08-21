import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { BachelorThesisEvaluationsQueryRequest } from "../../../contracts/requests/resources/bachelor-thesis-evaluations-query.request";
import { BachelorThesisEvaluationsQueryResponse } from "../../../contracts/responses/resources/bachelor-thesis-evaluations-query.response";
import { BachelorThesisEvaluationDto } from "../../../shared/dtos";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../contracts/constants/error-messages";
import { BachelorThesisEvaluationCreateRequest } from "../../../contracts/requests/resources/bachelor-thesis-evaluation-create.request";
import { BachelorThesisEvaluationUpdateRequest } from "../../../contracts/requests/resources/bachelor-thesis-evaluation-update.request";
import { BachelorThesisEvaluationServiceInterface } from "../../interfaces";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { ForbiddenError } from "../../../contracts/errors/forbidden.error";
import { BachelorThesisEvaluationRepoInterface } from "../../../dal/interfaces";

@injectable()
export class BachelorThesisEvaluationService implements BachelorThesisEvaluationServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.BachelorThesisEvaluationRepo) private bteRepo: BachelorThesisEvaluationRepoInterface) {

    }

    async getBachelorThesisEvaluations(user: AuthorizedUser, queryRequest: BachelorThesisEvaluationsQueryRequest)
        : Promise<BachelorThesisEvaluationsQueryResponse> {
        return await this.bteRepo.query(queryRequest);
    }

    async getBachelorThesisEvaluation(user: AuthorizedUser, id: number): Promise<BachelorThesisEvaluationDto> {
        return await this.ensureRecordExists(id);
    }

    async createBachelorThesisEvaluation(user: AuthorizedUser, createRequest: BachelorThesisEvaluationCreateRequest)
        : Promise<BachelorThesisEvaluationDto> {
        return await this.bteRepo.create(createRequest);
    }

    async updateBachelorThesisEvaluation(user: AuthorizedUser, id: number, 
        updateRequest: BachelorThesisEvaluationUpdateRequest) : Promise<BachelorThesisEvaluationDto> {
        const record = await this.ensureRecordExists(id);
        this.ensureValidModification(user, record);

        const result = await this.bteRepo.update(id, updateRequest);
        return result!;
    }

    async deleteBachelorThesisEvaluation(user: AuthorizedUser, id: number): Promise<void> {
        const record = await this.ensureRecordExists(id);
        this.ensureValidModification(user, record);

        await this.bteRepo.delete(id);
    }

    private async ensureRecordExists(id: number) {
        const result = await this.bteRepo.findOneById(id);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.BachelorThesisAssessmentNotFound);
        }
        return result;
    }

    private ensureValidModification(user: AuthorizedUser, record: BachelorThesisEvaluationDto) {
        const isValid = true;
        if (!isValid) {
            throw new ForbiddenError(ERROR_MESSAGES.Forbidden.BachelorThesisEvaluationDenied);
        }
    }
}