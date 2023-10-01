import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { 
    OralDefenseAssessmentInfosQueryRequest,
    OralDefenseAssessmentInfoUpdateRequest
} from "../../../contracts/requests";
import { OralDefenseAssessmentDto, OralDefenseAssessmentInfoDto } from "../../../shared/dtos";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../contracts/constants/error-messages";
import { OralDefenseAssessmentServiceInterface } from "../../interfaces";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { ForbiddenError } from "../../../contracts/errors/forbidden.error";
import { OralDefenseAssessmentRepoInterface } from "../../../dal/interfaces";
import { OralDefenseAssessmentInfosQueryResponse } from "../../../contracts/responses";
import { MapperServiceInterface } from "../../../shared/interfaces";
import { isAdmin } from "../../../utils/role-predicates";
import { isValidFormUpdate } from "../../../utils/forms-helpers";

@injectable()
export class OralDefenseAssessmentService implements OralDefenseAssessmentServiceInterface {
    private static SUPERVISOR1_UPDATABLE_FIELDS: readonly (keyof OralDefenseAssessmentInfoUpdateRequest)[] = [
        'dateDefense', 'placeDefense', 'startDate', 'finishDate', 
        'stateOfHealth', 'supervisor1Grade', 'record', 'assessmentDate',
    ];

    private static SUPERVISOR2_UPDATABLE_FIELDS: readonly (keyof OralDefenseAssessmentInfoUpdateRequest)[] = [
        'supervisor2Grade', 'record',
    ];

    constructor(
        @inject(INJECTION_TOKENS.OralDefenseAssessmentRepo) private odaRepo: OralDefenseAssessmentRepoInterface,
        @inject(INJECTION_TOKENS.MapperService) private mapper: MapperServiceInterface) {

    }

    async getOralDefenseAssessments(user: AuthorizedUser, queryRequest: OralDefenseAssessmentInfosQueryRequest)
        : Promise<OralDefenseAssessmentInfosQueryResponse> {
        const result = await this.odaRepo.query(queryRequest);
        return {
            content: result.content.map(item => this.makeInfoDto(user.userId, item)),
            count: result.count
        }
    }

    async getOralDefenseAssessment(user: AuthorizedUser, id: number): Promise<OralDefenseAssessmentInfoDto> {
        const result = await this.ensureRecordExists(id);
        return this.makeInfoDto(user.userId, result);
    }

    async updateOralDefenseAssessment(user: AuthorizedUser, id: number, 
        updateRequest: OralDefenseAssessmentInfoUpdateRequest) : Promise<OralDefenseAssessmentInfoDto> {
        const record = await this.ensureRecordExists(id);
        this.ensureValidUpdate(user, record, updateRequest);

        const result = await this.odaRepo.update(id, updateRequest);
        return this.makeInfoDto(user.userId, result!);
    }

    async deleteOralDefenseAssessment(user: AuthorizedUser, id: number): Promise<void> {
        const record = await this.ensureRecordExists(id);
        this.ensureValidDeletion(user, record);

        await this.odaRepo.delete(id);
    }

    private async ensureRecordExists(id: number) {
        const result = await this.odaRepo.findOneById(id);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.OralDefenseAssessmentNotFound);
        }
        return result;
    }

    private ensureValidUpdate(user: AuthorizedUser, record: OralDefenseAssessmentDto, 
        updateRequest: OralDefenseAssessmentInfoUpdateRequest) {
        const updatableFields = this.getUpdatableFields(user.userId, record);

        if (!isValidFormUpdate(updateRequest, updatableFields)) {
            throw new ForbiddenError(ERROR_MESSAGES.Forbidden.OralDefenseAssessmentDenied);
        }
    }

    private ensureValidDeletion(user: AuthorizedUser, record: OralDefenseAssessmentDto) {
        const isValid = isAdmin(user);
        if (!isValid) {
            throw new ForbiddenError(ERROR_MESSAGES.Forbidden.OralDefenseAssessmentDenied);
        }
    }

    private makeInfoDto(userId: string, dto: OralDefenseAssessmentDto): OralDefenseAssessmentInfoDto {
        const infoDto = this.mapper.map(OralDefenseAssessmentInfoDto, dto);
        infoDto.updatableFields.push(...this.getUpdatableFields(userId, dto));
        return infoDto;
    }

    private getUpdatableFields(userId: string, dto: OralDefenseAssessmentDto): readonly string[] {
        // Supervisor1's perspective
        if (dto.supervisor1Id === userId && !dto.supervisor1Confirmed) {
            return OralDefenseAssessmentService.SUPERVISOR1_UPDATABLE_FIELDS;
        }
        // Supervisor2's perspective
        else if (dto.supervisor2Id === userId && !dto.supervisor2Confirmed) {
            return OralDefenseAssessmentService.SUPERVISOR2_UPDATABLE_FIELDS;
        }
        
        return [];
    }
}