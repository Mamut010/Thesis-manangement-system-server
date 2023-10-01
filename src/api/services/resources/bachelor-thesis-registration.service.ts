import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { 
    BachelorThesisRegistrationInfoUpdateRequest,
    BachelorThesisRegistrationInfosQueryRequest,
} from "../../../contracts/requests";
import { BachelorThesisRegistrationDto, BachelorThesisRegistrationInfoDto } from "../../../shared/dtos";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../contracts/constants/error-messages";
import { BachelorThesisRegistrationServiceInterface } from "../../interfaces";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { ForbiddenError } from "../../../contracts/errors/forbidden.error";
import { BachelorThesisRegistrationRepoInterface } from "../../../dal/interfaces";
import { BachelorThesisRegistrationInfosQueryResponse } from "../../../contracts/responses";
import { MapperServiceInterface } from "../../../shared/interfaces";
import { isAdmin } from "../../../utils/role-predicates";
import { isValidFormUpdate } from "../../../utils/forms-helpers";

@injectable()
export class BachelorThesisRegistrationService implements BachelorThesisRegistrationServiceInterface {
    private static STUDENT_UPDATABLE_FIELDS: readonly (keyof BachelorThesisRegistrationInfoUpdateRequest)[] = [
        'dateOfBirth', 'placeOfBirth', 'studentDate', 'furtherParticipants',
    ];

    private static ADMIN_UPDATABLE_FIELDS: readonly (keyof BachelorThesisRegistrationInfoUpdateRequest)[] = [
        'issued', 'deadlineCopy', 'extensionGranted', 'chairmanOfExamination', 'dateOfIssue',
    ];

    constructor(
        @inject(INJECTION_TOKENS.BachelorThesisRegistrationRepo) private btrRepo: BachelorThesisRegistrationRepoInterface,
        @inject(INJECTION_TOKENS.MapperService) private mapper: MapperServiceInterface) {

    }

    async getBachelorThesisRegistrations(user: AuthorizedUser, queryRequest: BachelorThesisRegistrationInfosQueryRequest)
        : Promise<BachelorThesisRegistrationInfosQueryResponse> {
        const result = await this.btrRepo.query(queryRequest);
        return {
            content: result.content.map(item => this.makeInfoDto(user.userId, item)),
            count: result.count
        }
    }

    async getBachelorThesisRegistration(user: AuthorizedUser, id: number): Promise<BachelorThesisRegistrationInfoDto> {
        const result = await this.ensureRecordExists(id);
        return this.makeInfoDto(user.userId, result);
    }

    async updateBachelorThesisRegistration(user: AuthorizedUser, id: number, 
        updateRequest: BachelorThesisRegistrationInfoUpdateRequest): Promise<BachelorThesisRegistrationInfoDto> {
        const record = await this.ensureRecordExists(id);
        this.ensureValidUpdate(user, record, updateRequest);

        const result = await this.btrRepo.update(id, updateRequest);
        return this.makeInfoDto(user.userId, result!);
    }

    async deleteBachelorThesisRegistration(user: AuthorizedUser, id: number): Promise<void> {
        const record = await this.ensureRecordExists(id);
        this.ensureValidDeletion(user, record);

        await this.btrRepo.delete(id);
    }

    private async ensureRecordExists(id: number) {
        const result = await this.btrRepo.findOneById(id);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.BachelorThesisRegistrationNotFound);
        }
        return result;
    }

    private ensureValidUpdate(user: AuthorizedUser, record: BachelorThesisRegistrationDto, 
        updateRequest: BachelorThesisRegistrationInfoUpdateRequest) {
        const updatableFields = this.getUpdatableFields(user.userId, record);

        if (!isValidFormUpdate(updateRequest, updatableFields)) {
            throw new ForbiddenError(ERROR_MESSAGES.Forbidden.BachelorThesisRegistrationDenied);
        }
    }

    private ensureValidDeletion(user: AuthorizedUser, record: BachelorThesisRegistrationDto) {
        const isValid = isAdmin(user);
        if (!isValid) {
            throw new ForbiddenError(ERROR_MESSAGES.Forbidden.BachelorThesisRegistrationDenied);
        }
    }

    private makeInfoDto(userId: string, dto: BachelorThesisRegistrationDto): BachelorThesisRegistrationInfoDto {
        const infoDto = this.mapper.map(BachelorThesisRegistrationInfoDto, dto);
        infoDto.updatableFields.push(...this.getUpdatableFields(userId, dto));
        return infoDto;
    }

    private getUpdatableFields(userId: string, dto: BachelorThesisRegistrationDto): readonly string[] {
        // Student's perspective
        if (dto.studentId === userId && !dto.studentConfirmed && !dto.adminConfirmed) {
            return BachelorThesisRegistrationService.STUDENT_UPDATABLE_FIELDS;
        }
        // Admin's perspective
        else if (dto.programAdminGroupMemberIds?.includes(userId) && dto.studentConfirmed && !dto.adminConfirmed) {
            return BachelorThesisRegistrationService.ADMIN_UPDATABLE_FIELDS;
        }
        
        return [];
    }
}