import { inject, injectable } from "inversify";
import { AdminLecturerServiceInterface } from "../interfaces";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { 
    BachelorThesisAssessmentDto, 
    BachelorThesisRegistrationDto, 
    LecturerInfoDto, 
    OralDefenseAssessmentDto, 
    OralDefenseRegistrationDto
} from "../../shared/dtos";
import { LecturersQueryRequest } from "../../contracts/requests/api/lecturers-query.request";
import { LecturersQueryResponse } from "../../contracts/responses/api/lecturers-query.response";
import { LecturerUpdateRequest } from "../../contracts/requests/api/lecturer-update.request";
import { 
    BachelorThesisAssessmentRepoInterface, 
    BachelorThesisRegistrationRepoInterface, 
    LecturerRepoInterface, 
    OralDefenseAssessmentRepoInterface, 
    OralDefenseRegistrationRepoInterface
} from "../../dal/interfaces";
import { LecturerDetailResponse } from "../../contracts/responses/api/lecturer-info.response";
import { LecturerRoles } from "../../core/constants/roles";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { BadRequestError } from "../../contracts/errors/bad-request.error";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { LecturerAssetsQueryRequest } from "../../contracts/requests/api/lecturer-assets-query.request";
import { BachelorThesisRegistrationsQueryRequest } from "../../contracts/requests/resources/bachelor-thesis-registrations-query.request";
import { BachelorThesisAssessmentsQueryRequest } from "../../contracts/requests/resources/bachelor-thesis-assessments-query.request";
import { OralDefenseRegistrationsQueryRequest } from "../../contracts/requests/resources/oral-defense-registrations-query.request";
import { OralDefenseAssessmentsQueryRequest } from "../../contracts/requests/resources/oral-defense-assessments-query.request";

@injectable()
export class AdminLecturerService implements AdminLecturerServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.LecturerRepo) private lecturerRepo: LecturerRepoInterface,
        @inject(INJECTION_TOKENS.BachelorThesisRegistrationRepo) private btrRepo: BachelorThesisRegistrationRepoInterface,
        @inject(INJECTION_TOKENS.BachelorThesisAssessmentRepo) private btaRepo: BachelorThesisAssessmentRepoInterface,
        @inject(INJECTION_TOKENS.OralDefenseRegistrationRepo) private odrRepo: OralDefenseRegistrationRepoInterface,
        @inject(INJECTION_TOKENS.OralDefenseAssessmentRepo) private odaRepo: OralDefenseAssessmentRepoInterface) {

    }

    async getLecturers(lecturersQuery: LecturersQueryRequest): Promise<LecturersQueryResponse> {
        return await this.lecturerRepo.query(lecturersQuery);
    }

    async getLecturerInfo(lecturerId: string): Promise<LecturerInfoDto> {
        const result = await this.lecturerRepo.findOneById(lecturerId);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.LecturerNotFound);
        }

        return result;
    }

    async getLecturerDetail(lecturerId: string, lecturerAssetsQueryRequest: LecturerAssetsQueryRequest)
        : Promise<LecturerDetailResponse> {
        const response = new LecturerDetailResponse();
        response.lecturerInfo = await this.getLecturerInfo(lecturerId);

        response.bachelorThesisRegistrations = await this.getLecturerBachelorThesisRegistrations(lecturerId, 
            lecturerAssetsQueryRequest);

        response.oralDefenseRegistrations = await this.getLecturerOralDefenseRegistrations(lecturerId, 
            lecturerAssetsQueryRequest);

        response.bachelorThesisAssessments = await this.getLecturerBachelorThesisAssessments(lecturerId, 
            lecturerAssetsQueryRequest);
            
        response.oralDefenseAssessments = await this.getLecturerOralDefenseAssessments(lecturerId, 
            lecturerAssetsQueryRequest);

        return response;
    }

    async getLecturerBachelorThesisRegistrations(lecturerId: string, btrQueryRequest: BachelorThesisRegistrationsQueryRequest)
        : Promise<BachelorThesisRegistrationDto[]> {
        return await this.btrRepo.queryLecturerAssets(lecturerId, btrQueryRequest);
    }

    async getLecturerBachelorThesisAssessments(lecturerId: string, btaQueryRequest: BachelorThesisAssessmentsQueryRequest)
        : Promise<BachelorThesisAssessmentDto[]> {
        return await this.btaRepo.queryLecturerAssets(lecturerId, btaQueryRequest);
    }

    async getLecturerOralDefenseRegistrations(lecturerId: string, odrQueryRequest: OralDefenseRegistrationsQueryRequest)
        : Promise<OralDefenseRegistrationDto[]> {
        return await this.odrRepo.queryLecturerAssets(lecturerId, odrQueryRequest);
    }

    async getLecturerOralDefenseAssessments(lecturerId: string, odaQueryRequest: OralDefenseAssessmentsQueryRequest)
        : Promise<OralDefenseAssessmentDto[]> {
        return await this.odaRepo.queryLecturerAssets(lecturerId, odaQueryRequest);
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

        return result;
    }
}