import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { BachelorThesisEvaluationInfosQueryRequest } from "../../../contracts/requests";
import { BachelorThesisEvaluationDto, BachelorThesisEvaluationInfoDto } from "../../../shared/dtos";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../contracts/constants/error-messages";
import { BachelorThesisEvaluationServiceInterface } from "../../interfaces";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { ForbiddenError } from "../../../contracts/errors/forbidden.error";
import { BachelorThesisEvaluationRepoInterface } from "../../../dal/interfaces";
import { BachelorThesisEvaluationInfosQueryResponse } from "../../../contracts/responses";
import { MapperServiceInterface } from "../../../shared/interfaces";
import { isAdmin } from "../../../utils/role-predicates";

@injectable()
export class BachelorThesisEvaluationService implements BachelorThesisEvaluationServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.BachelorThesisEvaluationRepo) private bteRepo: BachelorThesisEvaluationRepoInterface,
        @inject(INJECTION_TOKENS.MapperService) private mapper: MapperServiceInterface) {

    }

    async getBachelorThesisEvaluations(user: AuthorizedUser, queryRequest: BachelorThesisEvaluationInfosQueryRequest)
        : Promise<BachelorThesisEvaluationInfosQueryResponse> {
        const result = await this.bteRepo.query(queryRequest);
        return {
            content: this.mapper.map(BachelorThesisEvaluationInfoDto, result.content),
            count: result.count
        }
    }

    async getBachelorThesisEvaluation(user: AuthorizedUser, id: number): Promise<BachelorThesisEvaluationInfoDto> {
        const result = await this.ensureRecordExists(id);
        return this.mapper.map(BachelorThesisEvaluationInfoDto, result);
    }

    async deleteBachelorThesisEvaluation(user: AuthorizedUser, id: number): Promise<void> {
        const record = await this.ensureRecordExists(id);
        this.ensureValidDeletion(user, record);

        await this.bteRepo.delete(id);
    }

    private async ensureRecordExists(id: number) {
        const result = await this.bteRepo.findOneById(id);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.BachelorThesisAssessmentNotFound);
        }
        return result;
    }

    private ensureValidDeletion(user: AuthorizedUser, record: BachelorThesisEvaluationDto) {
        const isValid = isAdmin(user);
        if (!isValid) {
            throw new ForbiddenError(ERROR_MESSAGES.Forbidden.BachelorThesisEvaluationDenied);
        }
    }
}