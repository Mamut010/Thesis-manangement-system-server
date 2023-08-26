import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { 
    OralDefenseAssessmentsQueryRequest, 
    OralDefenseAssessmentCreateRequest,
    OralDefenseAssessmentUpdateRequest
} from "../../../contracts/requests";
import { OralDefenseAssessmentDto, OralDefenseAssessmentInfoDto } from "../../../shared/dtos";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../contracts/constants/error-messages";
import { OralDefenseAssessmentServiceInterface } from "../../interfaces";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { ForbiddenError } from "../../../contracts/errors/forbidden.error";
import { OralDefenseAssessmentRepoInterface } from "../../../dal/interfaces";
import { OralDefenseAssessmentInfosQueryResponse } from "../../../contracts/responses";
import { MapperServiceInterface } from "../../../shared/interfaces";

@injectable()
export class OralDefenseAssessmentService implements OralDefenseAssessmentServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.OralDefenseAssessmentRepo) private odaRepo: OralDefenseAssessmentRepoInterface,
        @inject(INJECTION_TOKENS.MapperService) private mapper: MapperServiceInterface) {

    }

    async getOralDefenseAssessments(user: AuthorizedUser, queryRequest: OralDefenseAssessmentsQueryRequest)
        : Promise<OralDefenseAssessmentInfosQueryResponse> {
        const result = await this.odaRepo.query(queryRequest);
        return {
            content: this.mapper.map(OralDefenseAssessmentInfoDto, result.content),
            count: result.count
        }
    }

    async getOralDefenseAssessment(user: AuthorizedUser, id: number): Promise<OralDefenseAssessmentInfoDto> {
        const result = await this.ensureRecordExists(id);
        return this.mapper.map(OralDefenseAssessmentInfoDto, result);
    }

    async createOralDefenseAssessment(user: AuthorizedUser, createRequest: OralDefenseAssessmentCreateRequest)
        : Promise<OralDefenseAssessmentInfoDto> {
        const result = await this.odaRepo.create(createRequest);
        return this.mapper.map(OralDefenseAssessmentInfoDto, result);
    }

    async updateOralDefenseAssessment(user: AuthorizedUser, id: number, 
        updateRequest: OralDefenseAssessmentUpdateRequest) : Promise<OralDefenseAssessmentInfoDto> {
        const record = await this.ensureRecordExists(id);
        this.ensureValidModification(user, record);

        const result = await this.odaRepo.update(id, updateRequest);
        return this.mapper.map(OralDefenseAssessmentInfoDto, result);
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