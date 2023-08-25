import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { ProgramServiceInterface } from "../../interfaces";
import { ProgramsQueryRequest, ProgramCreateRequest, ProgramUpdateRequest } from "../../../contracts/requests";
import { ProgramsQueryResponse } from "../../../contracts/responses";
import { ProgramDto } from "../../../shared/dtos";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../contracts/constants/error-messages";
import { ProgramRepoInterface } from "../../../dal/interfaces";

@injectable()
export class ProgramService implements ProgramServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.ProgramRepo) private programRepo: ProgramRepoInterface) {

    }

    async getPrograms(queryRequest: ProgramsQueryRequest): Promise<ProgramsQueryResponse> {
        return await this.programRepo.query(queryRequest);
    }

    async getProgram(id: number): Promise<ProgramDto> {
        return await this.ensureRecordExists(id);
    }

    async createProgram(createRequest: ProgramCreateRequest): Promise<ProgramDto> {
        return await this.programRepo.create(createRequest);
    }

    async updateProgram(id: number, updateRequest: ProgramUpdateRequest): Promise<ProgramDto> {
        const record = await this.programRepo.update(id, updateRequest);
        if (!record) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.ProgramNotFound);
        }

        return record;
    }

    async deleteProgram(id: number): Promise<void> {
        await this.programRepo.delete(id);
    }

    private async ensureRecordExists(id: number) {
        const result = await this.programRepo.findOneById(id);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.ProgramNotFound);
        }
        return result;
    }
}