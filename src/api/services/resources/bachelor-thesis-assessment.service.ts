import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { 
    BachelorThesisAssessmentInfosQueryRequest,
    BachelorThesisAssessmentInfoUpdateRequest
} from "../../../contracts/requests";
import { BachelorThesisAssessmentDto, BachelorThesisAssessmentInfoDto } from "../../../shared/dtos";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../contracts/constants/error-messages";
import { BachelorThesisAssessmentServiceInterface } from "../../interfaces";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { ForbiddenError } from "../../../contracts/errors/forbidden.error";
import { BachelorThesisAssessmentRepoInterface } from "../../../dal/interfaces";
import { BachelorThesisAssessmentInfosQueryResponse } from "../../../contracts/responses";
import { MapperServiceInterface } from "../../../shared/interfaces";
import { isAdmin } from "../../../utils/role-predicates";

@injectable()
export class BachelorThesisAssessmentService implements BachelorThesisAssessmentServiceInterface {
    private static SUPERVISOR1_UPDATABLE_FIELDS: readonly (keyof BachelorThesisAssessmentInfoUpdateRequest)[] = [
        'furtherParticipants', 'supervisor1Grade', 'assessmentDescription', 'assessmentDate',
    ];

    private static SUPERVISOR2_UPDATABLE_FIELDS: readonly (keyof BachelorThesisAssessmentInfoUpdateRequest)[] = [
        'supervisor2Grade', 'assessmentDescription',
    ];

    constructor(
        @inject(INJECTION_TOKENS.BachelorThesisAssessmentRepo) private btaRepo: BachelorThesisAssessmentRepoInterface,
        @inject(INJECTION_TOKENS.MapperService) private mapper: MapperServiceInterface) {

    }

    async getBachelorThesisAssessments(user: AuthorizedUser, queryRequest: BachelorThesisAssessmentInfosQueryRequest)
        : Promise<BachelorThesisAssessmentInfosQueryResponse> {
        const result = await this.btaRepo.query(queryRequest);
        return {
            content: result.content.map(item => this.makeInfoDto(user.userId, item)),
            count: result.count
        }
    }

    async getBachelorThesisAssessment(user: AuthorizedUser, id: number): Promise<BachelorThesisAssessmentInfoDto> {
        const result = await this.ensureRecordExists(id);
        return this.makeInfoDto(user.userId, result);
    }

    async updateBachelorThesisAssessment(user: AuthorizedUser, id: number, 
        updateRequest: BachelorThesisAssessmentInfoUpdateRequest) : Promise<BachelorThesisAssessmentInfoDto> {
        const record = await this.ensureRecordExists(id);
        this.ensureValidUpdate(user, record, updateRequest);

        const result = await this.btaRepo.update(id, updateRequest);
        return this.makeInfoDto(user.userId, result!);
    }

    async deleteBachelorThesisAssessment(user: AuthorizedUser, id: number): Promise<void> {
        const record = await this.ensureRecordExists(id);
        this.ensureValidDeletion(user, record);

        await this.btaRepo.delete(id);
    }

    private async ensureRecordExists(id: number) {
        const result = await this.btaRepo.findOneById(id);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.BachelorThesisAssessmentNotFound);
        }
        return result;
    }

    private ensureValidUpdate(user: AuthorizedUser, record: BachelorThesisAssessmentDto, 
        updateRequest: BachelorThesisAssessmentInfoUpdateRequest) {
        const updatableFields = this.getUpdatableFields(user.userId, record);
        const updatableFieldSet = new Set(updatableFields);

        const isValid = Object.entries(updateRequest).every(entry => {
            return typeof entry[1] === 'undefined' 
                || updatableFieldSet.has(entry[0] as keyof BachelorThesisAssessmentInfoUpdateRequest);
        });

        if (!isValid) {
            throw new ForbiddenError(ERROR_MESSAGES.Forbidden.BachelorThesisAssessmentDenied);
        }
    }

    private ensureValidDeletion(user: AuthorizedUser, record: BachelorThesisAssessmentDto) {
        const isValid = isAdmin(user);
        if (!isValid) {
            throw new ForbiddenError(ERROR_MESSAGES.Forbidden.BachelorThesisAssessmentDenied);
        }
    }

    private makeInfoDto(userId: string, dto: BachelorThesisAssessmentDto): BachelorThesisAssessmentInfoDto {
        const infoDto = this.mapper.map(BachelorThesisAssessmentInfoDto, dto);
        infoDto.updatableFields.push(...this.getUpdatableFields(userId, dto));
        return infoDto;
    }

    private getUpdatableFields(userId: string, dto: BachelorThesisAssessmentDto) {
        // Supervisor1's perspective
        if (dto.supervisor1Id === userId && !dto.supervisor1Confirmed) {
            return BachelorThesisAssessmentService.SUPERVISOR1_UPDATABLE_FIELDS;
        }
        // Supervisor2's perspective
        else if (dto.supervisor2Id === userId && !dto.supervisor2Confirmed) {
            return BachelorThesisAssessmentService.SUPERVISOR2_UPDATABLE_FIELDS;
        }
        
        return [];
    }
}