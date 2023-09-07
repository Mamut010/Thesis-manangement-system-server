import { AssetsServiceInterface, LecturerMaintainerServiceInterface } from "../interfaces";
import { 
    BachelorThesisAssessmentInfoDto, 
    BachelorThesisEvaluationInfoDto, 
    BachelorThesisRegistrationInfoDto,
    LecturerInfoDto, 
    OralDefenseAssessmentInfoDto, 
    OralDefenseRegistrationInfoDto
} from "../../shared/dtos";
import { 
    LecturerInfoUpdateRequest,
    LecturerAssetsQueryRequest,
    BachelorThesisRegistrationsQueryRequest,
    BachelorThesisAssessmentsQueryRequest,
    OralDefenseRegistrationsQueryRequest,
    OralDefenseAssessmentsQueryRequest,
    BachelorThesisEvaluationsQueryRequest,
} from "../../contracts/requests";
import { LecturerRepoInterface } from "../../dal/interfaces";
import { LecturerDetailResponse } from "../../contracts/responses";
import { LecturerRoles } from "../../core/constants/roles";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { BadRequestError } from "../../contracts/errors/bad-request.error";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { MapperServiceInterface } from "../../shared/interfaces";

export class LecturerMaintainerService implements LecturerMaintainerServiceInterface {
    constructor(
        protected lecturerRepo: LecturerRepoInterface,
        protected assetsService: AssetsServiceInterface,
        protected mapper: MapperServiceInterface) {

    }

    async getLecturerInfo(lecturerId: string): Promise<LecturerInfoDto> {
        const result = await this.ensureLecturerExists(lecturerId);
        return this.mapper.map(LecturerInfoDto, result);
    }

    async getLecturerDetail(lecturerId: string, lecturerAssetsQueryRequest: LecturerAssetsQueryRequest)
        : Promise<LecturerDetailResponse> {
        const response = new LecturerDetailResponse();
        response.lecturerInfo = await this.getLecturerInfo(lecturerId);

        const btrPromise = this.getLecturerBachelorThesisRegistrations(lecturerId, lecturerAssetsQueryRequest, false);
        const btaPromise = this.getLecturerBachelorThesisAssessments(lecturerId, lecturerAssetsQueryRequest, false);
        const btePromise = this.getLecturerBachelorThesisEvaluations(lecturerId, lecturerAssetsQueryRequest, false);
        const odrPromise = this.getLecturerOralDefenseRegistrations(lecturerId, lecturerAssetsQueryRequest, false);
        const odaPromise = this.getLecturerOralDefenseAssessments(lecturerId, lecturerAssetsQueryRequest, false);

        response.bachelorThesisRegistrations = await btrPromise;
        response.bachelorThesisAssessments = await btaPromise;
        response.bachelorThesisEvaluations = await btePromise;
        response.oralDefenseRegistrations = await odrPromise;
        response.oralDefenseAssessments = await odaPromise;

        return response;
    }

    async getLecturerBachelorThesisRegistrations(lecturerId: string, btrQueryRequest: BachelorThesisRegistrationsQueryRequest,
        checkLecturer: boolean = true): Promise<BachelorThesisRegistrationInfoDto[]> {
        if (checkLecturer) {
            await this.ensureLecturerExists(lecturerId);
        }
        
        const result = await this.assetsService.getLecturerBachelorThesisRegistrations(lecturerId, btrQueryRequest);
        return this.mapper.map(BachelorThesisRegistrationInfoDto, result);
    }

    async getLecturerBachelorThesisAssessments(lecturerId: string, btaQueryRequest: BachelorThesisAssessmentsQueryRequest,
        checkLecturer: boolean = true): Promise<BachelorThesisAssessmentInfoDto[]> {
        if (checkLecturer) {
            await this.ensureLecturerExists(lecturerId);
        }

        const result = await this.assetsService.getLecturerBachelorThesisAssessments(lecturerId, btaQueryRequest);
        return this.mapper.map(BachelorThesisAssessmentInfoDto, result);
    }

    async getLecturerBachelorThesisEvaluations(lecturerId: string, bteQueryRequest: BachelorThesisEvaluationsQueryRequest,
        checkLecturer: boolean = true): Promise<BachelorThesisEvaluationInfoDto[]> {
        if (checkLecturer) {
            await this.ensureLecturerExists(lecturerId);
        }

        const result = await this.assetsService.getLecturerBachelorThesisEvaluations(lecturerId, bteQueryRequest);
        return this.mapper.map(BachelorThesisEvaluationInfoDto, result);
    }

    async getLecturerOralDefenseRegistrations(lecturerId: string, odrQueryRequest: OralDefenseRegistrationsQueryRequest,
        checkLecturer: boolean = true): Promise<OralDefenseRegistrationInfoDto[]> {
        if (checkLecturer) {
            await this.ensureLecturerExists(lecturerId);
        }

        const result = await this.assetsService.getLecturerOralDefenseRegistrations(lecturerId, odrQueryRequest);
        return this.mapper.map(OralDefenseRegistrationInfoDto, result);
    }

    async getLecturerOralDefenseAssessments(lecturerId: string, odaQueryRequest: OralDefenseAssessmentsQueryRequest,
        checkLecturer: boolean = true): Promise<OralDefenseAssessmentInfoDto[]> {
        if (checkLecturer) {
            await this.ensureLecturerExists(lecturerId);
        }

        const result = await this.assetsService.getLecturerOralDefenseAssessments(lecturerId, odaQueryRequest);
        return this.mapper.map(OralDefenseAssessmentInfoDto, result);
    }

    async updateLecturerInfo(lecturerId: string, updateRequest: LecturerInfoUpdateRequest): Promise<LecturerInfoDto> {
        // Check if 'type' is a lecturer role
        // Note: This assumes that the roles are predefined and won't be changed later on
        if (updateRequest.type && !LecturerRoles.some(item => item === updateRequest.type)) {
            throw new BadRequestError(ERROR_MESSAGES.Invalid.RoleInvalid);
        }

        const result = await this.lecturerRepo.update(lecturerId, updateRequest);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.LecturerNotFound);
        }

        return this.mapper.map(LecturerInfoDto, result);
    }

    protected async ensureLecturerExists(lecturerId: string) {
        const result = await this.lecturerRepo.findOneById(lecturerId);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.LecturerNotFound);
        }
        return result;
    }
}