import { inject, injectable } from "inversify";
import { AssetsServiceInterface } from "../interfaces";
import { 
    BachelorThesisRegistrationsQueryRequest, 
    BachelorThesisAssessmentsQueryRequest, 
    BachelorThesisEvaluationsQueryRequest, 
    OralDefenseRegistrationsQueryRequest, 
    OralDefenseAssessmentsQueryRequest 
} from "../../contracts/requests";
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
import { ClassConstructor } from "../../utils/types";
import { 
    BachelorThesisAssessmentsQueryResponse,
    BachelorThesisEvaluationsQueryResponse,
    BachelorThesisRegistrationsQueryResponse, 
    OralDefenseAssessmentsQueryResponse, 
    OralDefenseRegistrationsQueryResponse
} from "../../contracts/responses";
import { 
    BachelorThesisAssessmentDto, 
    BachelorThesisEvaluationDto, 
    BachelorThesisRegistrationDto, 
    OralDefenseAssessmentDto, 
    OralDefenseRegistrationDto 
} from "../../shared/dtos";

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
        : Promise<BachelorThesisRegistrationsQueryResponse> {
        return await this.btrRepo.queryLecturerAssets(lecturerId, queryRequest);
    }

    async getLecturerBachelorThesisAssessments(lecturerId: string, queryRequest: BachelorThesisAssessmentsQueryRequest)
        : Promise<BachelorThesisAssessmentsQueryResponse> {
        return await this.btaRepo.queryLecturerAssets(lecturerId, queryRequest);
    }

    async getLecturerBachelorThesisEvaluations(lecturerId: string, queryRequest: BachelorThesisEvaluationsQueryRequest)
        : Promise<BachelorThesisEvaluationsQueryResponse> {
        const supervisorIdFilter = new StringFilter();
        supervisorIdFilter.value = lecturerId;
        supervisorIdFilter.operator = 'equals';
        queryRequest.supervisorIdFilter = makeArray(supervisorIdFilter);

        return await this.bteRepo.query(queryRequest);
    }

    async getLecturerOralDefenseRegistrations(lecturerId: string, queryRequest: OralDefenseRegistrationsQueryRequest)
        : Promise<OralDefenseRegistrationsQueryResponse> {
        return await this.odrRepo.queryLecturerAssets(lecturerId, queryRequest);
    }

    async getLecturerOralDefenseAssessments(lecturerId: string, queryRequest: OralDefenseAssessmentsQueryRequest)
        : Promise<OralDefenseAssessmentsQueryResponse> {
        return await this.odaRepo.queryLecturerAssets(lecturerId, queryRequest);
    }

    async getStudentBachelorThesisRegistrations(studentId: string): Promise<BachelorThesisRegistrationDto[]> {
        const queryRequest = this.createStudentQueryRequest(BachelorThesisRegistrationsQueryRequest, studentId);
        const result = await this.btrRepo.query(queryRequest);
        return result.content;
    }
    async getStudentBachelorThesisAssessments(studentId: string): Promise<BachelorThesisAssessmentDto[]> {
        const queryRequest = this.createStudentQueryRequest(BachelorThesisAssessmentsQueryRequest, studentId);
        const result = await this.btaRepo.query(queryRequest);
        return result.content;
    }
    async getStudentBachelorThesisEvaluations(studentId: string): Promise<BachelorThesisEvaluationDto[]> {
        const queryRequest = this.createStudentQueryRequest(BachelorThesisEvaluationsQueryRequest, studentId);
        const result = await this.bteRepo.query(queryRequest);
        return result.content;
    }
    async getStudentOralDefenseRegistrations(studentId: string): Promise<OralDefenseRegistrationDto[]> {
        const queryRequest = this.createStudentQueryRequest(BachelorThesisEvaluationsQueryRequest, studentId);
        const result = await this.odrRepo.query(queryRequest);
        return result.content;
    }
    async getStudentOralDefenseAssessments(studentId: string): Promise<OralDefenseAssessmentDto[]> {
        const queryRequest = this.createStudentQueryRequest(BachelorThesisEvaluationsQueryRequest, studentId);
        const result = await this.odaRepo.query(queryRequest);
        return result.content;
    }

    private createStudentQueryRequest<T extends object>(cls: ClassConstructor<T>, studentId: string): T {
        const studentIdFilter = new StringFilter();
        studentIdFilter.value = studentId;
        studentIdFilter.operator = 'equals';

        const queryRequest = new cls();
        return Object.assign(queryRequest, { studentIdFilter: [studentIdFilter] });
    }
}