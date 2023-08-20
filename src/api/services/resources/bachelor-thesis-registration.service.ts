import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { BachelorThesisRegistrationsQueryRequest } from "../../../contracts/requests/resources/bachelor-thesis-registrations-query.request";
import { BachelorThesisRegistrationsQueryResponse } from "../../../contracts/responses/resources/bachelor-thesis-registrations-query.response";
import { BachelorThesisRegistrationDto } from "../../../shared/dtos";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../contracts/constants/error-messages";
import { BachelorThesisRegistrationCreateRequest } from "../../../contracts/requests/resources/bachelor-thesis-registration-create.request";
import { BachelorThesisRegistrationUpdateRequest } from "../../../contracts/requests/resources/bachelor-thesis-registration-update.request";
import { BachelorThesisRegistrationServiceInterface } from "../../interfaces";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { ForbiddenError } from "../../../contracts/errors/forbidden.error";
import { BachelorThesisRegistrationRepoInterface } from "../../../dal/interfaces";

@injectable()
export class BachelorThesisRegistrationService implements BachelorThesisRegistrationServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.BachelorThesisRegistrationRepo) private btrRepo: BachelorThesisRegistrationRepoInterface) {

    }

    async getBachelorThesisRegistrations(user: AuthorizedUser, queryRequest: BachelorThesisRegistrationsQueryRequest)
        : Promise<BachelorThesisRegistrationsQueryResponse> {
        return await this.btrRepo.query(queryRequest);
    }

    async getBachelorThesisRegistration(user: AuthorizedUser, id: number): Promise<BachelorThesisRegistrationDto> {
        return await this.ensureRecordExists(id);
    }

    async createBachelorThesisRegistration(user: AuthorizedUser, createRequest: BachelorThesisRegistrationCreateRequest)
        : Promise<BachelorThesisRegistrationDto> {
        return await this.btrRepo.create(createRequest);
    }

    async updateBachelorThesisRegistration(user: AuthorizedUser, id: number, 
        updateRequest: BachelorThesisRegistrationUpdateRequest): Promise<BachelorThesisRegistrationDto> {
        const record = await this.ensureRecordExists(id);
        this.ensureValidModification(user, record);

        const result = await this.btrRepo.update(id, updateRequest);
        return result!;
    }

    async deleteBachelorThesisRegistration(user: AuthorizedUser, id: number): Promise<void> {
        const record = await this.ensureRecordExists(id);
        this.ensureValidModification(user, record);

        await this.btrRepo.delete(id);
    }

    private async ensureRecordExists(id: number) {
        const result = await this.btrRepo.findOneById(id);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.BachelorThesisRegistrationNotFound);
        }
        return result;
    }

    private ensureValidModification(user: AuthorizedUser, record: BachelorThesisRegistrationDto) {
        const isValid = true;
        if (!isValid) {
            throw new ForbiddenError(ERROR_MESSAGES.Forbidden.BachelorThesisRegistrationDenied);
        }
    }
}