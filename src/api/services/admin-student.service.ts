import { inject, injectable } from "inversify";
import { AdminStudentServiceInterface } from "../interfaces";
import { StudentDetailResponse, StudentInfosQueryResponse } from "../../contracts/responses";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { 
    BachelorThesisAssessmentInfoDto, 
    BachelorThesisEvaluationInfoDto, 
    BachelorThesisRegistrationInfoDto,
    OralDefenseAssessmentInfoDto, 
    OralDefenseRegistrationInfoDto,
    StudentInfoDto
} from "../../shared/dtos";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { 
    BachelorThesisAssessmentRepoInterface, 
    BachelorThesisEvaluationRepoInterface, 
    BachelorThesisRegistrationRepoInterface, 
    OralDefenseAssessmentRepoInterface, 
    OralDefenseRegistrationRepoInterface, 
    StudentRepoInterface 
} from "../../dal/interfaces";
import { 
    StudentUpdateRequest,
    BachelorThesisRegistrationsQueryRequest,
    BachelorThesisAssessmentsQueryRequest,
    OralDefenseRegistrationsQueryRequest,
    OralDefenseAssessmentsQueryRequest,
    BachelorThesisEvaluationsQueryRequest,
    StudentInfosQueryRequest
} from "../../contracts/requests";
import { StringFilter } from "../../lib/query";
import { ClassConstructor } from "../../utils/types";
import { singleOrDefault } from "../../utils/array-helpers";
import { InfoMapperInterface } from "../../shared/utils/info-mapper";

@injectable()
export class AdminStudentService implements AdminStudentServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.StudentRepo) private studentRepo: StudentRepoInterface,
        @inject(INJECTION_TOKENS.BachelorThesisRegistrationRepo) private btrRepo: BachelorThesisRegistrationRepoInterface,
        @inject(INJECTION_TOKENS.BachelorThesisAssessmentRepo) private btaRepo: BachelorThesisAssessmentRepoInterface,
        @inject(INJECTION_TOKENS.BachelorThesisEvaluationRepo) private bteRepo: BachelorThesisEvaluationRepoInterface,
        @inject(INJECTION_TOKENS.OralDefenseRegistrationRepo) private odrRepo: OralDefenseRegistrationRepoInterface,
        @inject(INJECTION_TOKENS.OralDefenseAssessmentRepo) private odaRepo: OralDefenseAssessmentRepoInterface,
        @inject(INJECTION_TOKENS.InfoMapper) private infoMapper: InfoMapperInterface) {

    }

    async getStudents(studentsQuery: StudentInfosQueryRequest): Promise<StudentInfosQueryResponse> {
        const result = await this.studentRepo.query(studentsQuery);
        return {
            content: this.infoMapper.mapStudent(result.content),
            count: result.count
        }
    }

    async getStudentInfo(studentId: string): Promise<StudentInfoDto> {
        const result = await this.ensureRecordExists(studentId);
        return this.infoMapper.mapStudent(result);
    }

    async getStudentDetail(studentId: string): Promise<StudentDetailResponse> {
        const response = new StudentDetailResponse();
        response.studentInfo = await this.getStudentInfo(studentId);

        const studentBtr = await this.queryStudentBachelorThesisRegistration(studentId);
        const studentBta = await this.queryStudentBachelorThesisAssessment(studentId);
        const studentBte = await this.queryStudentBachelorThesisEvaluation(studentId);
        const studentOdr = await this.queryStudentOralDefenseRegistration(studentId);
        const studentOda = await this.queryStudentOralDefenseAssessment(studentId);

        response.bachelorThesisRegistration = singleOrDefault(studentBtr, null);
        response.bachelorThesisAssessment = singleOrDefault(studentBta, null);
        response.bachelorThesisEvaluation = singleOrDefault(studentBte, null);
        response.oralDefenseRegistration = singleOrDefault(studentOdr, null);
        response.oralDefenseAssessment = singleOrDefault(studentOda, null);

        return response;
    }

    async getStudentBachelorThesisRegistration(studentId: string): Promise<BachelorThesisRegistrationInfoDto> {
        await this.ensureRecordExists(studentId);
        
        const result = await this.queryStudentBachelorThesisRegistration(studentId);
        if (result.length === 0) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.BachelorThesisRegistrationNotFound);
        }

        return result[0];
    }

    async getStudentBachelorThesisAssessment(studentId: string): Promise<BachelorThesisAssessmentInfoDto> {
        await this.ensureRecordExists(studentId);

        const result = await this.queryStudentBachelorThesisAssessment(studentId);
        if (result.length === 0) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.BachelorThesisAssessmentNotFound);
        }

        return result[0];
    }

    async getStudentBachelorThesisEvaluation(studentId: string): Promise<BachelorThesisEvaluationInfoDto> {
        await this.ensureRecordExists(studentId);

        const result = await this.queryStudentBachelorThesisEvaluation(studentId);
        if (result.length === 0) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.BachelorThesisEvaluationNotFound);
        }

        return result[0];
    }

    async getStudentOralDefenseRegistration(studentId: string): Promise<OralDefenseRegistrationInfoDto> {
        await this.ensureRecordExists(studentId);
        
        const result = await this.queryStudentOralDefenseRegistration(studentId);
        if (result.length === 0) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.OralDefenseRegistrationNotFound);
        }

        return result[0];
    }

    async getStudentOralDefenseAssessment(studentId: string): Promise<OralDefenseAssessmentInfoDto> {
        await this.ensureRecordExists(studentId);
        
        const result = await this.queryStudentOralDefenseAssessment(studentId);
        if (result.length === 0) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.OralDefenseAssessmentNotFound);
        }

        return result[0];
    }

    async updateStudent(studentId: string, updateRequest: StudentUpdateRequest): Promise<StudentInfoDto> {
        const result = await this.studentRepo.update(studentId, updateRequest);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.StudentNotFound);
        }

        return this.infoMapper.mapStudent(result);
    }

    private async ensureRecordExists(studentId: string) {
        const result = await this.studentRepo.findOneById(studentId);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.StudentNotFound);
        }
        return result;
    }

    private async queryStudentBachelorThesisRegistration(studentId: string) {
        const queryRequest = this.createQueryRequest(BachelorThesisRegistrationsQueryRequest, studentId);
        const queryResponse = await this.btrRepo.query(queryRequest);
        return this.infoMapper.mapBachelorThesisRegistration(queryResponse.content);
    }

    private async queryStudentBachelorThesisAssessment(studentId: string) {
        const queryRequest = this.createQueryRequest(BachelorThesisAssessmentsQueryRequest, studentId);
        const queryResponse = await this.btaRepo.query(queryRequest);
        return this.infoMapper.mapBachelorThesisAssessment(queryResponse.content);
    }

    private async queryStudentBachelorThesisEvaluation(studentId: string) {
        const queryRequest = this.createQueryRequest(BachelorThesisEvaluationsQueryRequest, studentId);
        const queryResponse = await this.bteRepo.query(queryRequest);
        return this.infoMapper.mapBachelorThesisEvaluation(queryResponse.content);
    }

    private async queryStudentOralDefenseRegistration(studentId: string) {
        const queryRequest = this.createQueryRequest(OralDefenseRegistrationsQueryRequest, studentId);
        const queryResponse = await this.odrRepo.query(queryRequest);
        return this.infoMapper.mapOralDefenseRegistration(queryResponse.content);
    }

    private async queryStudentOralDefenseAssessment(studentId: string) {
        const queryRequest = this.createQueryRequest(OralDefenseAssessmentsQueryRequest, studentId);
        const queryResponse = await this.odaRepo.query(queryRequest);
        return this.infoMapper.mapOralDefenseAssessment(queryResponse.content);
    }

    private createQueryRequest<T extends object>(cls: ClassConstructor<T>, studentId: string): T {
        const studentIdFilter = new StringFilter();
        studentIdFilter.value = studentId;
        studentIdFilter.operator = 'equals';

        const queryRequest = new cls();
        return Object.assign(queryRequest, { studentIdFilter: [studentIdFilter] });
    }
}