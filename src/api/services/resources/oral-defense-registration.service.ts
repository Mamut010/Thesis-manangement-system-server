import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { OralDefenseRegistrationsQueryRequest } from "../../../contracts/requests/resources/oral-defense-registrations-query.request";
import { OralDefenseRegistrationDto, OralDefenseRegistrationInfoDto } from "../../../shared/dtos";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../contracts/constants/error-messages";
import { OralDefenseRegistrationCreateRequest } from "../../../contracts/requests/resources/oral-defense-registration-create.request";
import { OralDefenseRegistrationUpdateRequest } from "../../../contracts/requests/resources/oral-defense-registration-update.request";
import { OralDefenseRegistrationServiceInterface } from "../../interfaces";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { ForbiddenError } from "../../../contracts/errors/forbidden.error";
import { OralDefenseRegistrationRepoInterface } from "../../../dal/interfaces";
import { plainToInstanceExactMatch } from "../../../utils/class-transformer-helpers";
import { OralDefenseRegistrationInfosQueryResponse } from "../../../contracts/responses/api/oral-defense-registration-infos-query.response";

@injectable()
export class OralDefenseRegistrationService implements OralDefenseRegistrationServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.OralDefenseRegistrationRepo) private odrRepo: OralDefenseRegistrationRepoInterface) {

    }

    async getOralDefenseRegistrations(user: AuthorizedUser, queryRequest: OralDefenseRegistrationsQueryRequest)
        : Promise<OralDefenseRegistrationInfosQueryResponse> {
        const result = await this.odrRepo.query(queryRequest);
        return {
            content: result.content.map(item => plainToInstanceExactMatch(OralDefenseRegistrationInfoDto, item)),
            count: result.count
        }
    }

    async getOralDefenseRegistration(user: AuthorizedUser, id: number): Promise<OralDefenseRegistrationInfoDto> {
        const result = await this.ensureRecordExists(id);
        return plainToInstanceExactMatch(OralDefenseRegistrationInfoDto, result);
    }

    async createOralDefenseRegistration(user: AuthorizedUser, createRequest: OralDefenseRegistrationCreateRequest)
        : Promise<OralDefenseRegistrationInfoDto> {
        const result = this.odrRepo.create(createRequest);
        return plainToInstanceExactMatch(OralDefenseRegistrationInfoDto, result);
    }

    async updateOralDefenseRegistration(user: AuthorizedUser, id: number, 
        updateRequest: OralDefenseRegistrationUpdateRequest) : Promise<OralDefenseRegistrationInfoDto> {
        const record = await this.ensureRecordExists(id);
        this.ensureValidModification(user, record);

        const result = await this.odrRepo.update(id, updateRequest);
        return plainToInstanceExactMatch(OralDefenseRegistrationInfoDto, result);
    }

    async deleteOralDefenseRegistration(user: AuthorizedUser, id: number): Promise<void> {
        const record = await this.ensureRecordExists(id);
        this.ensureValidModification(user, record);

        await this.odrRepo.delete(id);
    }

    private async ensureRecordExists(id: number) {
        const result = await this.odrRepo.findOneById(id);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.OralDefenseRegistrationNotFound);
        }
        return result;
    }

    private ensureValidModification(user: AuthorizedUser, record: OralDefenseRegistrationDto) {
        const isValid = true;
        if (!isValid) {
            throw new ForbiddenError(ERROR_MESSAGES.Forbidden.OralDefenseRegistrationDenied);
        }
    }
}