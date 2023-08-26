import { inject, injectable } from "inversify";
import { AdminLecturerServiceInterface, AssetsServiceInterface } from "../interfaces";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { 
    BachelorThesisAssessmentInfoDto, 
    BachelorThesisEvaluationInfoDto, 
    BachelorThesisRegistrationInfoDto,
    LecturerInfoDto, 
    OralDefenseAssessmentInfoDto, 
    OralDefenseRegistrationInfoDto
} from "../../shared/dtos";
import { 
    LecturerUpdateRequest,
    LecturerAssetsQueryRequest,
    BachelorThesisRegistrationsQueryRequest,
    BachelorThesisAssessmentsQueryRequest,
    OralDefenseRegistrationsQueryRequest,
    OralDefenseAssessmentsQueryRequest,
    BachelorThesisEvaluationsQueryRequest,
    LecturerInfosQueryRequest
} from "../../contracts/requests";
import { LecturerRepoInterface } from "../../dal/interfaces";
import { LecturerDetailResponse, LecturerInfosQueryResponse } from "../../contracts/responses";
import { LecturerRoles } from "../../core/constants/roles";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { BadRequestError } from "../../contracts/errors/bad-request.error";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { MapperServiceInterface } from "../../shared/interfaces";

@injectable()
export class AdminLecturerService implements AdminLecturerServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.LecturerRepo) private lecturerRepo: LecturerRepoInterface,
        @inject(INJECTION_TOKENS.AssetsService) private assetsService: AssetsServiceInterface,
        @inject(INJECTION_TOKENS.MapperService) private mapper: MapperServiceInterface) {

    }

    async getLecturers(lecturersQuery: LecturerInfosQueryRequest): Promise<LecturerInfosQueryResponse> {
        const result = await this.lecturerRepo.query(lecturersQuery);
        return {
            content: this.mapper.map(LecturerInfoDto, result.content),
            count: result.count,
        }
    }

    async getLecturerInfo(lecturerId: string): Promise<LecturerInfoDto> {
        const result = await this.ensureRecordExists(lecturerId);
        return this.mapper.map(LecturerInfoDto, result);
    }

    async getLecturerDetail(lecturerId: string, lecturerAssetsQueryRequest: LecturerAssetsQueryRequest)
        : Promise<LecturerDetailResponse> {
        const response = new LecturerDetailResponse();
        response.lecturerInfo = await this.getLecturerInfo(lecturerId);

        response.bachelorThesisRegistrations = await this.getLecturerBachelorThesisRegistrations(lecturerId, 
            lecturerAssetsQueryRequest);

        response.bachelorThesisAssessments = await this.getLecturerBachelorThesisAssessments(lecturerId, 
            lecturerAssetsQueryRequest);

        response.bachelorThesisEvaluations = await this.getLecturerBachelorThesisEvaluations(lecturerId, 
            lecturerAssetsQueryRequest);

        response.oralDefenseRegistrations = await this.getLecturerOralDefenseRegistrations(lecturerId, 
            lecturerAssetsQueryRequest);
            
        response.oralDefenseAssessments = await this.getLecturerOralDefenseAssessments(lecturerId, 
            lecturerAssetsQueryRequest);

        return response;
    }

    async getLecturerBachelorThesisRegistrations(lecturerId: string, btrQueryRequest: BachelorThesisRegistrationsQueryRequest)
        : Promise<BachelorThesisRegistrationInfoDto[]> {
        await this.ensureRecordExists(lecturerId);
        const result = await this.assetsService.getLecturerBachelorThesisRegistrations(lecturerId, btrQueryRequest);
        return this.mapper.map(BachelorThesisRegistrationInfoDto, result);
    }

    async getLecturerBachelorThesisAssessments(lecturerId: string, btaQueryRequest: BachelorThesisAssessmentsQueryRequest)
        : Promise<BachelorThesisAssessmentInfoDto[]> {
        await this.ensureRecordExists(lecturerId);
        const result = await this.assetsService.getLecturerBachelorThesisAssessments(lecturerId, btaQueryRequest);
        return this.mapper.map(BachelorThesisAssessmentInfoDto, result);
    }

    async getLecturerBachelorThesisEvaluations(lecturerId: string, bteQueryRequest: BachelorThesisEvaluationsQueryRequest)
        : Promise<BachelorThesisEvaluationInfoDto[]> {
        await this.ensureRecordExists(lecturerId);
        const result = await this.assetsService.getLecturerBachelorThesisEvaluations(lecturerId, bteQueryRequest);
        return this.mapper.map(BachelorThesisEvaluationInfoDto, result);
    }

    async getLecturerOralDefenseRegistrations(lecturerId: string, odrQueryRequest: OralDefenseRegistrationsQueryRequest)
        : Promise<OralDefenseRegistrationInfoDto[]> {
        await this.ensureRecordExists(lecturerId);
        const result = await this.assetsService.getLecturerOralDefenseRegistrations(lecturerId, odrQueryRequest);
        return this.mapper.map(OralDefenseRegistrationInfoDto, result);
    }

    async getLecturerOralDefenseAssessments(lecturerId: string, odaQueryRequest: OralDefenseAssessmentsQueryRequest)
        : Promise<OralDefenseAssessmentInfoDto[]> {
        await this.ensureRecordExists(lecturerId);
        const result = await this.assetsService.getLecturerOralDefenseAssessments(lecturerId, odaQueryRequest);
        return this.mapper.map(OralDefenseAssessmentInfoDto, result);
    }

    async updateLecturerInfo(lecturerId: string, updateRequest: LecturerUpdateRequest): Promise<LecturerInfoDto> {
        // Check if 'type' is a lecturer role
        // Note: This assumes that the roles are predefined and won't be changed later on
        if (updateRequest.type && !LecturerRoles.some(item => item === updateRequest.type)) {
            throw new BadRequestError(ERROR_MESSAGES.Invalid.RoleInvalid);
        }

        const result = await this.lecturerRepo.update(lecturerId, updateRequest);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.LecturerNotFound);
        }

        return this.mapper.map(LecturerInfoDto, result);;
    }

    private async ensureRecordExists(lecturerId: string) {
        const result = await this.lecturerRepo.findOneById(lecturerId);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.LecturerNotFound);
        }
        return result;
    }
}