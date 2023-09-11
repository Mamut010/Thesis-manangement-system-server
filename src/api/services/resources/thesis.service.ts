import { inject, injectable } from "inversify";
import { ThesisServiceInterface } from "../../interfaces";
import { ThesisInfoDto } from "../../../shared/dtos";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../contracts/constants/error-messages";
import { ThesisInfoCreateRequest, ThesisInfoUpdateRequest, ThesisInfosQueryRequest } from "../../../contracts/requests";
import { ThesisInfosQueryResponse } from "../../../contracts/responses";
import { ThesisRepoInterface } from "../../../dal/interfaces";
import { MapperServiceInterface } from "../../../shared/interfaces";

@injectable()
export class ThesisService implements ThesisServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.ThesisRepo) private thesisRepo: ThesisRepoInterface,
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
        return await this.ensureRecordExists(id);
    }

    async createThesis(userId: string, createRequest: ThesisInfoCreateRequest): Promise<ThesisInfoDto> {
        const result = await this.thesisRepo.create({
            ...createRequest,
            creatorId: userId
        });
        return this.mapper.map(ThesisInfoDto, result);
    }

    async updateThesis(id: number, updateRequest: ThesisInfoUpdateRequest): Promise<ThesisInfoDto> {
        const result = await this.thesisRepo.update(id, updateRequest);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.ThesisNotFound);
        }

        return this.mapper.map(ThesisInfoDto, result);
    }

    async deleteThesis(id: number): Promise<void> {
        const deleted = await this.thesisRepo.delete(id);
        if (!deleted) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.ThesisNotFound);
        }
    }

    private async ensureRecordExists(id: number) {
        const result = await this.thesisRepo.findOneById(id);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.ThesisNotFound);
        }
        return result;
    }
}