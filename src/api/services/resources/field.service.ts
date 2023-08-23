import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { FieldServiceInterface } from "../../interfaces";
import { FieldsQueryRequest, FieldCreateRequest, FieldUpdateRequest } from "../../../contracts/requests";
import { FieldsQueryResponse } from "../../../contracts/responses";
import { FieldDto } from "../../../shared/dtos";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../contracts/constants/error-messages";
import { FieldRepoInterface } from "../../../dal/interfaces";

@injectable()
export class FieldService implements FieldServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.FieldRepo) private fieldRepo: FieldRepoInterface) {

    }

    async getFields(queryRequest: FieldsQueryRequest): Promise<FieldsQueryResponse> {
        return await this.fieldRepo.query(queryRequest);
    }

    async getField(id: number): Promise<FieldDto> {
        return await this.ensureRecordExists(id);
    }

    async createField(createRequest: FieldCreateRequest): Promise<FieldDto> {
        return await this.fieldRepo.create(createRequest);
    }

    async updateField(id: number, updateRequest: FieldUpdateRequest): Promise<FieldDto> {
        const record = await this.fieldRepo.update(id, updateRequest);
        if (!record) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.FieldNotFound);
        }

        return record;
    }

    async deleteField(id: number): Promise<void> {
        await this.fieldRepo.delete(id);
    }

    private async ensureRecordExists(id: number) {
        const result = await this.fieldRepo.findOneById(id);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.FieldNotFound);
        }
        return result;
    }
}