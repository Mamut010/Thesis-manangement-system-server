import { inject, injectable } from "inversify";
import { AssetsServiceInterface } from "../interfaces";
import { 
    BachelorThesisRegistrationsQueryRequest, 
    BachelorThesisAssessmentsQueryRequest, 
    BachelorThesisEvaluationsQueryRequest, 
    OralDefenseRegistrationsQueryRequest, 
    OralDefenseAssessmentsQueryRequest 
} from "../../contracts/requests";
import { 
    BachelorThesisRegistrationDto, 
    BachelorThesisAssessmentDto, 
    BachelorThesisEvaluationDto, 
    OralDefenseRegistrationDto, 
    OralDefenseAssessmentDto
} from "../../shared/dtos";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { 
    BachelorThesisAssessmentRepoInterface, 
    BachelorThesisEvaluationRepoInterface, 
    BachelorThesisRegistrationRepoInterface, 
    OralDefenseAssessmentRepoInterface, 
    OralDefenseRegistrationRepoInterface 
} from "../../dal/interfaces";
import { makeArray } from "../../utils/array-helpers";
import { StringFilter } from "../../lib/query";

@injectable()
export class AssetsService implements AssetsServiceInterface {
    constructor(        
        @inject(INJECTION_TOKENS.BachelorThesisRegistrationRepo) private btrRepo: BachelorThesisRegistrationRepoInterface,
        @inject(INJECTION_TOKENS.BachelorThesisAssessmentRepo) private btaRepo: BachelorThesisAssessmentRepoInterface,
        @inject(INJECTION_TOKENS.BachelorThesisEvaluationRepo) private bteRepo: BachelorThesisEvaluationRepoInterface,
        @inject(INJECTION_TOKENS.OralDefenseRegistrationRepo) private odrRepo: OralDefenseRegistrationRepoInterface,
        @inject(INJECTION_TOKENS.OralDefenseAssessmentRepo) private odaRepo: OralDefenseAssessmentRepoInterface) {

    }

    async getLecturerBachelorThesisRegistrations(lecturerId: string, queryRequest: BachelorThesisRegistrationsQueryRequest)
        : Promise<BachelorThesisRegistrationDto[]> {
        return await this.btrRepo.queryLecturerAssets(lecturerId, queryRequest);
    }

    async getLecturerBachelorThesisAssessments(lecturerId: string, queryRequest: BachelorThesisAssessmentsQueryRequest)
        : Promise<BachelorThesisAssessmentDto[]> {
        return await this.btaRepo.queryLecturerAssets(lecturerId, queryRequest);
    }

    async getLecturerBachelorThesisEvaluations(lecturerId: string, queryRequest: BachelorThesisEvaluationsQueryRequest)
        : Promise<BachelorThesisEvaluationDto[]> {
        const supervisorIdFilter = new StringFilter();
        supervisorIdFilter.value = lecturerId;
        supervisorIdFilter.operator = 'equals';
        queryRequest.supervisorIdFilter = makeArray(supervisorIdFilter);

        return (await this.bteRepo.query(queryRequest)).content;
    }

    async getLecturerOralDefenseRegistrations(lecturerId: string, queryRequest: OralDefenseRegistrationsQueryRequest)
        : Promise<OralDefenseRegistrationDto[]> {
        return await this.odrRepo.queryLecturerAssets(lecturerId, queryRequest);
    }

    async getLecturerOralDefenseAssessments(lecturerId: string, queryRequest: OralDefenseAssessmentsQueryRequest)
        : Promise<OralDefenseAssessmentDto[]> {
        return await this.odaRepo.queryLecturerAssets(lecturerId, queryRequest);
    }
}