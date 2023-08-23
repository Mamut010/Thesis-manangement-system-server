import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { 
    BachelorThesisAssessmentsQueryRequest, 
    BachelorThesisAssessmentCreateRequest, 
    BachelorThesisAssessmentUpdateRequest
} from "../../../contracts/requests";
import { BachelorThesisAssessmentDto, BachelorThesisAssessmentInfoDto } from "../../../shared/dtos";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../contracts/constants/error-messages";
import { BachelorThesisAssessmentServiceInterface } from "../../interfaces";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { ForbiddenError } from "../../../contracts/errors/forbidden.error";
import { BachelorThesisAssessmentRepoInterface } from "../../../dal/interfaces";
import { plainToInstanceExactMatch } from "../../../utils/class-transformer-helpers";
import { BachelorThesisAssessmentInfosQueryResponse } from "../../../contracts/responses";

@injectable()
export class BachelorThesisAssessmentService implements BachelorThesisAssessmentServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.BachelorThesisAssessmentRepo) private btaRepo: BachelorThesisAssessmentRepoInterface) {

    }

    async getBachelorThesisAssessments(user: AuthorizedUser, queryRequest: BachelorThesisAssessmentsQueryRequest)
        : Promise<BachelorThesisAssessmentInfosQueryResponse> {
        const result = await this.btaRepo.query(queryRequest);
        return {
            content: result.content.map(item => plainToInstanceExactMatch(BachelorThesisAssessmentInfoDto, item)),
            count: result.count
        }
    }

    async getBachelorThesisAssessment(user: AuthorizedUser, id: number): Promise<BachelorThesisAssessmentInfoDto> {
        const result = await this.ensureRecordExists(id);
        return plainToInstanceExactMatch(BachelorThesisAssessmentInfoDto, result);
    }

    async createBachelorThesisAssessment(user: AuthorizedUser, createRequest: BachelorThesisAssessmentCreateRequest)
        : Promise<BachelorThesisAssessmentInfoDto> {
        const result = await this.btaRepo.create(createRequest);
        return plainToInstanceExactMatch(BachelorThesisAssessmentInfoDto, result);
    }

    async updateBachelorThesisAssessment(user: AuthorizedUser, id: number, 
        updateRequest: BachelorThesisAssessmentUpdateRequest) : Promise<BachelorThesisAssessmentInfoDto> {
        const record = await this.ensureRecordExists(id);
        this.ensureValidModification(user, record);

        const result = await this.btaRepo.update(id, updateRequest);
        return plainToInstanceExactMatch(BachelorThesisAssessmentInfoDto, result);
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