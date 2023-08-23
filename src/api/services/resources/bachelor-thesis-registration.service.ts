import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { 
    BachelorThesisRegistrationsQueryRequest,
    BachelorThesisRegistrationCreateRequest,
    BachelorThesisRegistrationUpdateRequest
} from "../../../contracts/requests";
import { BachelorThesisRegistrationDto, BachelorThesisRegistrationInfoDto } from "../../../shared/dtos";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../contracts/constants/error-messages";
import { BachelorThesisRegistrationServiceInterface } from "../../interfaces";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { ForbiddenError } from "../../../contracts/errors/forbidden.error";
import { BachelorThesisRegistrationRepoInterface } from "../../../dal/interfaces";
import { BachelorThesisRegistrationInfosQueryResponse } from "../../../contracts/responses";
import { plainToInstanceExactMatch } from "../../../utils/class-transformer-helpers";

@injectable()
export class BachelorThesisRegistrationService implements BachelorThesisRegistrationServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.BachelorThesisRegistrationRepo) private btrRepo: BachelorThesisRegistrationRepoInterface) {

    }

    async getBachelorThesisRegistrations(user: AuthorizedUser, queryRequest: BachelorThesisRegistrationsQueryRequest)
        : Promise<BachelorThesisRegistrationInfosQueryResponse> {
        const result = await this.btrRepo.query(queryRequest);
        return {
            content: result.content.map(item => plainToInstanceExactMatch(BachelorThesisRegistrationInfoDto, item)),
            count: result.count
        }
    }

    async getBachelorThesisRegistration(user: AuthorizedUser, id: number): Promise<BachelorThesisRegistrationInfoDto> {
        const result = await this.ensureRecordExists(id);
        return plainToInstanceExactMatch(BachelorThesisRegistrationInfoDto, result);
    }

    async createBachelorThesisRegistration(user: AuthorizedUser, createRequest: BachelorThesisRegistrationCreateRequest)
        : Promise<BachelorThesisRegistrationInfoDto> {
        const result = await this.btrRepo.create(createRequest);
        return plainToInstanceExactMatch(BachelorThesisRegistrationInfoDto, result);
    }

    async updateBachelorThesisRegistration(user: AuthorizedUser, id: number, 
        updateRequest: BachelorThesisRegistrationUpdateRequest): Promise<BachelorThesisRegistrationInfoDto> {
        const record = await this.ensureRecordExists(id);
        this.ensureValidModification(user, record);

        const result = await this.btrRepo.update(id, updateRequest);
        return plainToInstanceExactMatch(BachelorThesisRegistrationInfoDto, result);
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