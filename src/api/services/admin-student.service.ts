import { inject, injectable } from "inversify";
import { AdminStudentServiceInterface, AssetsServiceInterface } from "../interfaces";
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
import { StudentRepoInterface } from "../../dal/interfaces";
import { StudentUpdateRequest, StudentInfosQueryRequest } from "../../contracts/requests";
import { MapperServiceInterface } from "../../shared/interfaces";

@injectable()
export class AdminStudentService implements AdminStudentServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.StudentRepo) private studentRepo: StudentRepoInterface,
        @inject(INJECTION_TOKENS.AssetsService) private assetsService: AssetsServiceInterface,
        @inject(INJECTION_TOKENS.MapperService) private mapper: MapperServiceInterface) {

    }

    async getStudents(studentsQuery: StudentInfosQueryRequest): Promise<StudentInfosQueryResponse> {
        const result = await this.studentRepo.query(studentsQuery);
        return {
            content: this.mapper.map(StudentInfoDto, result.content),
            count: result.count
        }
    }

    async getStudentInfo(studentId: string): Promise<StudentInfoDto> {
        const result = await this.ensureRecordExists(studentId);
        return this.mapper.map(StudentInfoDto, result);
    }

    async getStudentDetail(studentId: string): Promise<StudentDetailResponse> {
        const response = new StudentDetailResponse();
        response.studentInfo = await this.getStudentInfo(studentId);

        const btrPromise = this.getStudentBachelorThesisRegistrationInner(studentId);
        const btaPromise = this.getStudentBachelorThesisAssessmentInner(studentId);
        const btePromise = this.getStudentBachelorThesisEvaluationInner(studentId);
        const odrPromise = this.getStudentOralDefenseRegistrationInner(studentId);
        const odaPromise = this.getStudentOralDefenseAssessmentInner(studentId);

        response.bachelorThesisRegistration = await btrPromise;
        response.bachelorThesisAssessment = await btaPromise;
        response.bachelorThesisEvaluation = await btePromise;
        response.oralDefenseRegistration = await odrPromise;
        response.oralDefenseAssessment = await odaPromise;

        return response;
    }

    async getStudentBachelorThesisRegistration(studentId: string): Promise<BachelorThesisRegistrationInfoDto> {
        await this.ensureRecordExists(studentId);

        const result = await this.getStudentBachelorThesisRegistrationInner(studentId);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.BachelorThesisRegistrationNotFound);
        }
        return result;
    }

    async getStudentBachelorThesisAssessment(studentId: string): Promise<BachelorThesisAssessmentInfoDto> {
        await this.ensureRecordExists(studentId);

        const result = await this.getStudentBachelorThesisAssessmentInner(studentId);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.BachelorThesisAssessmentNotFound);
        }
        return result;
    }

    async getStudentBachelorThesisEvaluation(studentId: string): Promise<BachelorThesisEvaluationInfoDto> {
        await this.ensureRecordExists(studentId);

        const result = await this.getStudentBachelorThesisEvaluationInner(studentId);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.BachelorThesisEvaluationNotFound);
        }
        return result;
    }

    async getStudentOralDefenseRegistration(studentId: string): Promise<OralDefenseRegistrationInfoDto> {
        await this.ensureRecordExists(studentId);
        
        const result = await this.getStudentOralDefenseRegistrationInner(studentId);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.OralDefenseRegistrationNotFound);
        }

        return result;
    }

    async getStudentOralDefenseAssessment(studentId: string): Promise<OralDefenseAssessmentInfoDto> {
        await this.ensureRecordExists(studentId);
        
        const result = await this.getStudentOralDefenseAssessmentInner(studentId);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.OralDefenseAssessmentNotFound);
        }

        return result;
    }

    async updateStudent(studentId: string, updateRequest: StudentUpdateRequest): Promise<StudentInfoDto> {
        const result = await this.studentRepo.update(studentId, updateRequest);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.StudentNotFound);
        }

        return this.mapper.map(StudentInfoDto, result);
    }

    private async getStudentBachelorThesisRegistrationInner(studentId: string)
        : Promise<BachelorThesisRegistrationInfoDto | null> {
        const result = await this.assetsService.getStudentBachelorThesisRegistration(studentId);
        return result ? this.mapper.map(BachelorThesisRegistrationInfoDto, result) : null;
    }

    private async getStudentBachelorThesisAssessmentInner(studentId: string)
        : Promise<BachelorThesisAssessmentInfoDto | null> {
        const result = await this.assetsService.getStudentBachelorThesisAssessment(studentId);
        return result ? this.mapper.map(BachelorThesisAssessmentInfoDto, result) : null;
    }

    private async getStudentBachelorThesisEvaluationInner(studentId: string)
        : Promise<BachelorThesisEvaluationInfoDto | null> {
        const result = await this.assetsService.getStudentBachelorThesisEvaluation(studentId);
        return result ? this.mapper.map(BachelorThesisEvaluationInfoDto, result) : null;
    }

    private async getStudentOralDefenseRegistrationInner(studentId: string)
        : Promise<OralDefenseRegistrationInfoDto | null> {
        const result = await this.assetsService.getStudentOralDefenseRegistration(studentId);
        return result ? this.mapper.map(OralDefenseRegistrationInfoDto, result) : null;
    }

    private async getStudentOralDefenseAssessmentInner(studentId: string)
        : Promise<OralDefenseAssessmentInfoDto | null> {
        const result = await this.assetsService.getStudentOralDefenseAssessment(studentId);
        return result ? this.mapper.map(OralDefenseAssessmentInfoDto, result) : null;
    }

    private async ensureRecordExists(studentId: string) {
        const result = await this.studentRepo.findOneById(studentId);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.StudentNotFound);
        }
        return result;
    }
}