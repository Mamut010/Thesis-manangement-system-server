import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { LecturerRepoInterface } from "../../dal/interfaces";
import { AssetsServiceInterface, LecturerServiceInterface } from "../interfaces";
import { MapperServiceInterface } from "../../shared/interfaces";
import { 
    BachelorThesisAssessmentInfosQueryRequest,
    BachelorThesisEvaluationInfosQueryRequest,
    BachelorThesisRegistrationInfosQueryRequest,
    LecturerInfoUpdateRequest, 
    LecturerInfosQueryRequest, 
    OralDefenseAssessmentInfosQueryRequest,
    OralDefenseRegistrationInfosQueryRequest,
    SimpleQueryRequest,
} from "../../contracts/requests";
import { 
    BachelorThesisAssessmentInfosQueryResponse,
    BachelorThesisEvaluationInfosQueryResponse,
    BachelorThesisRegistrationInfosQueryResponse,
    LecturerDetailResponse, 
    LecturerInfosQueryResponse, 
    OralDefenseAssessmentInfosQueryResponse,
    OralDefenseRegistrationInfosQueryResponse,
} from "../../contracts/responses";
import { 
    BachelorThesisAssessmentInfoDto, 
    BachelorThesisEvaluationInfoDto, 
    BachelorThesisRegistrationInfoDto, 
    LecturerInfoDto, 
    OralDefenseAssessmentInfoDto, 
    OralDefenseRegistrationInfoDto 
} from "../../shared/dtos";
import { LecturerRoles } from "../../core/constants/roles";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { BadRequestError } from "../../contracts/errors/bad-request.error";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { BaseQueryRequest } from "../../contracts/bases";
import { queryRequestOrDefault } from "../../utils/query-request-helpers";

@injectable()
export class LecturerService implements LecturerServiceInterface {
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
        const result = await this.ensureLecturerExists(lecturerId);
        return this.mapper.map(LecturerInfoDto, result);
    }

    async getLecturerDetail(lecturerId: string, queryRequest?: SimpleQueryRequest)
        : Promise<LecturerDetailResponse> {
        const response = new LecturerDetailResponse();
        response.lecturerInfo = await this.getLecturerInfo(lecturerId);

        const btrPromise = this.getLecturerBachelorThesisRegistrations(lecturerId, queryRequest, false);
        const btaPromise = this.getLecturerBachelorThesisAssessments(lecturerId, queryRequest, false);
        const btePromise = this.getLecturerBachelorThesisEvaluations(lecturerId, queryRequest, false);
        const odrPromise = this.getLecturerOralDefenseRegistrations(lecturerId, queryRequest, false);
        const odaPromise = this.getLecturerOralDefenseAssessments(lecturerId, queryRequest, false);

        response.bachelorThesisRegistrations = (await btrPromise).content;
        response.bachelorThesisAssessments = (await btaPromise).content;
        response.bachelorThesisEvaluations = (await btePromise).content;
        response.oralDefenseRegistrations = (await odrPromise).content;
        response.oralDefenseAssessments = (await odaPromise).content;

        return response;
    }

    async getLecturerBachelorThesisRegistrations(lecturerId: string, btrQueryRequest?: BachelorThesisRegistrationInfosQueryRequest,
        checkLecturer: boolean = true): Promise<BachelorThesisRegistrationInfosQueryResponse> {
        if (checkLecturer) {
            await this.ensureLecturerExists(lecturerId);
        }
        
        const result = await this.assetsService.getLecturerBachelorThesisRegistrations(lecturerId,
            queryRequestOrDefault(btrQueryRequest));

        return {
            count: result.count,
            content: result.content.map(item => this.mapper.map(BachelorThesisRegistrationInfoDto, item)),
        };
    }

    async getLecturerBachelorThesisAssessments(lecturerId: string, btaQueryRequest?: BachelorThesisAssessmentInfosQueryRequest,
        checkLecturer: boolean = true): Promise<BachelorThesisAssessmentInfosQueryResponse> {
        if (checkLecturer) {
            await this.ensureLecturerExists(lecturerId);
        }

        const result = await this.assetsService.getLecturerBachelorThesisAssessments(lecturerId, 
            queryRequestOrDefault(btaQueryRequest));

        return {
            count: result.count,
            content: result.content.map(item => this.mapper.map(BachelorThesisAssessmentInfoDto, item)),
        };
    }

    async getLecturerBachelorThesisEvaluations(lecturerId: string, bteQueryRequest?: BachelorThesisEvaluationInfosQueryRequest,
        checkLecturer: boolean = true): Promise<BachelorThesisEvaluationInfosQueryResponse> {
        if (checkLecturer) {
            await this.ensureLecturerExists(lecturerId);
        }

        const result = await this.assetsService.getLecturerBachelorThesisEvaluations(lecturerId, 
            queryRequestOrDefault(bteQueryRequest));
        
        return {
            count: result.count,
            content: result.content.map(item => this.mapper.map(BachelorThesisEvaluationInfoDto, item)),
        };
    }

    async getLecturerOralDefenseRegistrations(lecturerId: string, odrQueryRequest?: OralDefenseRegistrationInfosQueryRequest,
        checkLecturer: boolean = true): Promise<OralDefenseRegistrationInfosQueryResponse> {
        if (checkLecturer) {
            await this.ensureLecturerExists(lecturerId);
        }

        const result = await this.assetsService.getLecturerOralDefenseRegistrations(lecturerId, 
            queryRequestOrDefault(odrQueryRequest));

        return {
            count: result.count,
            content: result.content.map(item => this.mapper.map(OralDefenseRegistrationInfoDto, item)),
        };
    }

    async getLecturerOralDefenseAssessments(lecturerId: string, odaQueryRequest?: OralDefenseAssessmentInfosQueryRequest,
        checkLecturer: boolean = true): Promise<OralDefenseAssessmentInfosQueryResponse> {
        if (checkLecturer) {
            await this.ensureLecturerExists(lecturerId);
        }

        const result = await this.assetsService.getLecturerOralDefenseAssessments(lecturerId,
            queryRequestOrDefault(odaQueryRequest));

        return {
            count: result.count,
            content: result.content.map(item => this.mapper.map(OralDefenseAssessmentInfoDto, item)),
        };
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

    private async ensureLecturerExists(lecturerId: string) {
        const result = await this.lecturerRepo.findOneById(lecturerId);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.LecturerNotFound);
        }
        return result;
    }
}