import { inject, injectable } from "inversify";
import { ThesisServiceInterface } from "../../interfaces";
import { ThesisInfoDto } from "../../../shared/dtos";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../contracts/constants/error-messages";
import { ThesisInfoCreateRequest, ThesisInfoUpdateRequest, ThesisInfosQueryRequest } from "../../../contracts/requests";
import { ThesisInfosQueryResponse } from "../../../contracts/responses";
import { LecturerRepoInterface, ThesisRepoInterface } from "../../../dal/interfaces";
import { MapperServiceInterface } from "../../../shared/interfaces";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { isAdmin } from "../../../utils/role-predicates";
import { BadRequestError } from "../../../contracts/errors/bad-request.error";
import { ForbiddenError } from "../../../contracts/errors/forbidden.error";

@injectable()
export class ThesisService implements ThesisServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.ThesisRepo) private thesisRepo: ThesisRepoInterface,
        @inject(INJECTION_TOKENS.LecturerRepo) private lecturerRepo: LecturerRepoInterface,
        @inject(INJECTION_TOKENS.MapperService) private mapper: MapperServiceInterface) {

    }

    async getTheses(queryRequest: ThesisInfosQueryRequest): Promise<ThesisInfosQueryResponse> {
        const result = await this.thesisRepo.query(queryRequest);
        return {
            content: this.mapper.map(ThesisInfoDto, result.content),
            count: result.count
        }
    }

    async getThesis(id: number): Promise<ThesisInfoDto> {
        return await this.ensureThesisExists(id);
    }

    async createThesis(user: AuthorizedUser, createRequest: ThesisInfoCreateRequest): Promise<ThesisInfoDto> {
        let creatorId = user.userId;
        if (isAdmin(user)) {
            if (typeof createRequest.creatorId !== 'string') {
                throw new BadRequestError(ERROR_MESSAGES.BadRequest.MissingCreatorId);
            }
            await this.ensureLecturerExists(createRequest.creatorId);
            creatorId = createRequest.creatorId;
        }

        const result = await this.thesisRepo.create({
            ...createRequest,
            creatorId,
        });
        return this.mapper.map(ThesisInfoDto, result);
    }

    async updateThesis(user: AuthorizedUser, id: number, updateRequest: ThesisInfoUpdateRequest): Promise<ThesisInfoDto> {
        const result = await this.thesisRepo.update(id, updateRequest);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.ThesisNotFound);
        }

        return this.mapper.map(ThesisInfoDto, result);
    }

    async deleteThesis(user: AuthorizedUser, id: number): Promise<void> {
        const thesis = await this.ensureThesisExists(id);
        // Users other than admins cannot delete others' theses
        if (!isAdmin(user) && user.userId !== thesis.creatorId) {
            throw new ForbiddenError(ERROR_MESSAGES.Forbidden.CannotDeleteOthersTheses);
        } 

        await this.thesisRepo.delete(id);
    }

    private async ensureThesisExists(id: number) {
        const result = await this.thesisRepo.findOneById(id);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.ThesisNotFound);
        }
        return result;
    }

    private async ensureLecturerExists(id: string) {
        const result = await this.lecturerRepo.findOneById(id);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.LecturerNotFound);
        }
        return result;
    }
}