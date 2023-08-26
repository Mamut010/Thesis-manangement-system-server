import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { 
    OralDefenseRegistrationsQueryRequest, 
    OralDefenseRegistrationCreateRequest,
    OralDefenseRegistrationUpdateRequest
} from "../../../contracts/requests";
import { OralDefenseRegistrationDto, OralDefenseRegistrationInfoDto } from "../../../shared/dtos";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../contracts/constants/error-messages";
import { OralDefenseRegistrationServiceInterface } from "../../interfaces";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { ForbiddenError } from "../../../contracts/errors/forbidden.error";
import { OralDefenseRegistrationRepoInterface } from "../../../dal/interfaces";
import { OralDefenseRegistrationInfosQueryResponse } from "../../../contracts/responses";
import { MapperServiceInterface } from "../../../shared/interfaces";

@injectable()
export class OralDefenseRegistrationService implements OralDefenseRegistrationServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.OralDefenseRegistrationRepo) private odrRepo: OralDefenseRegistrationRepoInterface,
        @inject(INJECTION_TOKENS.MapperService) private mapper: MapperServiceInterface) {

    }

    async getOralDefenseRegistrations(user: AuthorizedUser, queryRequest: OralDefenseRegistrationsQueryRequest)
        : Promise<OralDefenseRegistrationInfosQueryResponse> {
        const result = await this.odrRepo.query(queryRequest);
        return {
            content: this.mapper.map(OralDefenseRegistrationInfoDto, result.content),
            count: result.count
        }
    }

    async getOralDefenseRegistration(user: AuthorizedUser, id: number): Promise<OralDefenseRegistrationInfoDto> {
        const result = await this.ensureRecordExists(id);
        return this.mapper.map(OralDefenseRegistrationInfoDto, result);
    }

    async createOralDefenseRegistration(user: AuthorizedUser, createRequest: OralDefenseRegistrationCreateRequest)
        : Promise<OralDefenseRegistrationInfoDto> {
        const result = await this.odrRepo.create(createRequest);
        return this.mapper.map(OralDefenseRegistrationInfoDto, result);
    }

    async updateOralDefenseRegistration(user: AuthorizedUser, id: number, 
        updateRequest: OralDefenseRegistrationUpdateRequest) : Promise<OralDefenseRegistrationInfoDto> {
        const record = await this.ensureRecordExists(id);
        this.ensureValidModification(user, record);

        const result = await this.odrRepo.update(id, updateRequest);
        return this.mapper.map(OralDefenseRegistrationInfoDto, result);
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