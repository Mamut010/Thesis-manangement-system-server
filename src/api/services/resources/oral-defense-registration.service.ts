import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { 
    OralDefenseRegistrationInfoUpdateRequest,
    OralDefenseRegistrationInfosQueryRequest,
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
import { isAdmin } from "../../../utils/role-predicates";
import { isValidFormUpdate } from "../../../utils/forms-helpers";
import { BadRequestError } from "../../../contracts/errors/bad-request.error";

@injectable()
export class OralDefenseRegistrationService implements OralDefenseRegistrationServiceInterface {
    private static STUDENT_UPDATABLE_FIELDS: readonly (keyof OralDefenseRegistrationInfoUpdateRequest)[] = [
        'room', 'areSpectatorsAllowed', 'proposedDate', 'concernedAgreed',
    ];

    private static ADMIN_UPDATABLE_FIELDS: readonly (keyof OralDefenseRegistrationInfoUpdateRequest)[] = [
        'room', 'actualDate', 'dateReceived', 'admissionDate',
    ];

    constructor(
        @inject(INJECTION_TOKENS.OralDefenseRegistrationRepo) private odrRepo: OralDefenseRegistrationRepoInterface,
        @inject(INJECTION_TOKENS.MapperService) private mapper: MapperServiceInterface) {

    }

    async getOralDefenseRegistrations(user: AuthorizedUser, queryRequest: OralDefenseRegistrationInfosQueryRequest)
        : Promise<OralDefenseRegistrationInfosQueryResponse> {
        const result = await this.odrRepo.query(queryRequest);
        return {
            content: result.content.map(item => this.makeInfoDto(user.userId, item)),
            count: result.count
        }
    }

    async getOralDefenseRegistration(user: AuthorizedUser, id: number): Promise<OralDefenseRegistrationInfoDto> {
        const result = await this.ensureRecordExists(id);
        return this.makeInfoDto(user.userId, result);
    }

    async updateOralDefenseRegistration(user: AuthorizedUser, id: number, 
        updateRequest: OralDefenseRegistrationInfoUpdateRequest) : Promise<OralDefenseRegistrationInfoDto> {
        const record = await this.ensureRecordExists(id);
        this.ensureValidUpdate(user, record, updateRequest);

        const result = await this.odrRepo.update(id, updateRequest);
        return this.makeInfoDto(user.userId, result!);
    }

    async deleteOralDefenseRegistration(user: AuthorizedUser, id: number): Promise<void> {
        const record = await this.ensureRecordExists(id);
        this.ensureValidDeletion(user, record);

        await this.odrRepo.delete(id);
    }

    private async ensureRecordExists(id: number) {
        const result = await this.odrRepo.findOneById(id);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.OralDefenseRegistrationNotFound);
        }
        return result;
    }

    private ensureValidUpdate(user: AuthorizedUser, record: OralDefenseRegistrationDto, 
        updateRequest: OralDefenseRegistrationInfoUpdateRequest) {
        const updatableFields = this.getUpdatableFields(user.userId, record);

        if (!isValidFormUpdate(updateRequest, updatableFields)) {
            throw new BadRequestError(ERROR_MESSAGES.BadRequest.OnlyUpdatableFieldsAllowed);
        }
    }

    private ensureValidDeletion(user: AuthorizedUser, record: OralDefenseRegistrationDto) {
        const isValid = isAdmin(user);
        if (!isValid) {
            throw new ForbiddenError(ERROR_MESSAGES.Forbidden.OralDefenseRegistrationDenied);
        }
    }

    private makeInfoDto(userId: string, dto: OralDefenseRegistrationDto): OralDefenseRegistrationInfoDto {
        const infoDto = this.mapper.map(OralDefenseRegistrationInfoDto, dto);
        infoDto.updatableFields.push(...this.getUpdatableFields(userId, dto));
        return infoDto;
    }

    private getUpdatableFields(userId: string, dto: OralDefenseRegistrationDto): readonly string[] {
        // Student's perspective
        if (dto.studentId === userId && !dto.studentConfirmed && !dto.adminConfirmed) {
            return OralDefenseRegistrationService.STUDENT_UPDATABLE_FIELDS;
        }
        // Admin's perspective
        else if (dto.programAdminGroupMemberIds?.includes(userId) && dto.studentConfirmed && !dto.adminConfirmed) {
            return OralDefenseRegistrationService.ADMIN_UPDATABLE_FIELDS;
        }
        
        return [];
    }
}