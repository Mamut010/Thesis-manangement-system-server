import { inject, injectable } from "inversify";
import { ThesisServiceInterface } from "../../interfaces";
import { ThesisDto } from "../../../shared/dtos";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../contracts/constants/error-messages";
import { ThesesQueryRequest } from "../../../contracts/requests/resources/theses-query.request";
import { ThesesQueryResponse } from "../../../contracts/responses/resources/theses-query.response";
import { ThesisCreateRequest } from "../../../contracts/requests/resources/thesis-create.request";
import { ThesisRepoInterface } from "../../../dal/interfaces";

@injectable()
export class ThesisService implements ThesisServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.ThesisRepo) private thesisRepo: ThesisRepoInterface) {

    }

    async getTheses(queryRequest: ThesesQueryRequest): Promise<ThesesQueryResponse> {
        return await this.thesisRepo.query(queryRequest);
    }

    async getThesis(id: number): Promise<ThesisDto> {
        return await this.ensureRecordExists(id);
    }

    async createThesis(createRequest: ThesisCreateRequest): Promise<ThesisDto> {
        return await this.thesisRepo.create(createRequest);
    }

    async updateThesis(id: number, updateRequest: ThesisCreateRequest): Promise<ThesisDto> {
        const record = await this.thesisRepo.update(id, updateRequest);
        if (!record) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.ThesisNotFound);
        }

        return record;
    }

    async deleteThesis(id: number): Promise<void> {
        await this.thesisRepo.delete(id);
    }

    private async ensureRecordExists(id: number) {
        const result = await this.thesisRepo.findOneById(id);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.ThesisNotFound);
        }
        return result;
    }
}