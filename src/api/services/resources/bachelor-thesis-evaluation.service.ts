import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { 
    BachelorThesisEvaluationsQueryRequest,
    BachelorThesisEvaluationCreateRequest,
    BachelorThesisEvaluationUpdateRequest
} from "../../../contracts/requests";
import { BachelorThesisEvaluationDto, BachelorThesisEvaluationInfoDto } from "../../../shared/dtos";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../contracts/constants/error-messages";
import { BachelorThesisEvaluationServiceInterface } from "../../interfaces";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { ForbiddenError } from "../../../contracts/errors/forbidden.error";
import { BachelorThesisEvaluationRepoInterface } from "../../../dal/interfaces";
import { BachelorThesisEvaluationInfosQueryResponse } from "../../../contracts/responses";
import { plainToInstanceExactMatch } from "../../../utils/class-transformer-helpers";

@injectable()
export class BachelorThesisEvaluationService implements BachelorThesisEvaluationServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.BachelorThesisEvaluationRepo) private bteRepo: BachelorThesisEvaluationRepoInterface) {

    }

    async getBachelorThesisEvaluations(user: AuthorizedUser, queryRequest: BachelorThesisEvaluationsQueryRequest)
        : Promise<BachelorThesisEvaluationInfosQueryResponse> {
        const result = await this.bteRepo.query(queryRequest);
        return {
            content: result.content.map(item => plainToInstanceExactMatch(BachelorThesisEvaluationInfoDto, item)),
            count: result.count
        }
    }

    async getBachelorThesisEvaluation(user: AuthorizedUser, id: number): Promise<BachelorThesisEvaluationInfoDto> {
        const result = await this.ensureRecordExists(id);
        return plainToInstanceExactMatch(BachelorThesisEvaluationInfoDto, result);
    }

    async createBachelorThesisEvaluation(user: AuthorizedUser, createRequest: BachelorThesisEvaluationCreateRequest)
        : Promise<BachelorThesisEvaluationInfoDto> {
        const result = await this.bteRepo.create(createRequest);
        return plainToInstanceExactMatch(BachelorThesisEvaluationInfoDto, result);
    }

    async updateBachelorThesisEvaluation(user: AuthorizedUser, id: number, 
        updateRequest: BachelorThesisEvaluationUpdateRequest) : Promise<BachelorThesisEvaluationInfoDto> {
        const record = await this.ensureRecordExists(id);
        this.ensureValidModification(user, record);

        const result = await this.bteRepo.update(id, updateRequest);
        return plainToInstanceExactMatch(BachelorThesisEvaluationInfoDto, result);
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