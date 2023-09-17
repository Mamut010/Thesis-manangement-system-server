import { inject, injectable } from "inversify";
import { StudentServiceInterface } from "../interfaces/student.service.interface";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { 
    BachelorThesisAssessmentInfoDto, 
    BachelorThesisEvaluationInfoDto, 
    BachelorThesisRegistrationInfoDto, 
    OralDefenseAssessmentInfoDto, 
    OralDefenseRegistrationInfoDto, 
    RequestStateInfoDto, 
    StudentInfoDto 
} from "../../shared/dtos";
import { firstOrDefault } from "../../utils/array-helpers";
import { UnexpectedError } from "../../contracts/errors/unexpected.error";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { ThesisRequestCreateRequest } from "../../contracts/requests/api/thesis-request-create.request";
import { ProcessRepoInterface, StudentAttemptRepoInterface, StudentRepoInterface } from "../../dal/interfaces";
import { AssetsServiceInterface, RequestServiceInterface } from "../interfaces";
import { MapperServiceInterface } from "../../shared/interfaces";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { StudentInfoUpdateRequest, StudentInfosQueryRequest } from "../../contracts/requests";
import { StudentDetailResponse, StudentInfosQueryResponse } from "../../contracts/responses";
import { getThesisProcessOrThrow } from "../../utils/process-helpers";
import { AuthorizedUser } from "../../core/auth-checkers";
import { ConflictError } from "../../contracts/errors/conflict.error";

@injectable()
export class StudentService implements StudentServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.StudentRepo) private studentRepo: StudentRepoInterface,
        @inject(INJECTION_TOKENS.StudentAttemptRepo) private studentAttemptRepo: StudentAttemptRepoInterface,
        @inject(INJECTION_TOKENS.ProcessRepo) private processRepo: ProcessRepoInterface,
        @inject(INJECTION_TOKENS.AssetsService) private assetsService: AssetsServiceInterface,
        @inject(INJECTION_TOKENS.RequestService) private requestService: RequestServiceInterface,
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
        const result = await this.ensureStudentExists(studentId);
        return this.mapper.map(StudentInfoDto, result);
    }

    async getStudentDetail(studentId: string): Promise<StudentDetailResponse> {
        const response = new StudentDetailResponse();
        response.studentInfo = await this.getStudentInfo(studentId);

        const btrPromise = this.getStudentBachelorThesisRegistrations(studentId);
        const btaPromise = this.getStudentBachelorThesisAssessments(studentId);
        const btePromise = this.getStudentBachelorThesisEvaluations(studentId);
        const odrPromise = this.getStudentOralDefenseRegistrations(studentId);
        const odaPromise = this.getStudentOralDefenseAssessments(studentId);

        response.bachelorThesisRegistrations = await btrPromise;
        response.bachelorThesisAssessments = await btaPromise;
        response.bachelorThesisEvaluations = await btePromise;
        response.oralDefenseRegistrations = await odrPromise;
        response.oralDefenseAssessments = await odaPromise;

        return response;
    }

    async getStudentBachelorThesisRegistrations(studentId: string, checkStudent: boolean = true)
        : Promise<BachelorThesisRegistrationInfoDto[]> {
        if (checkStudent) {
            await this.ensureStudentExists(studentId);
        }

        const result = await this.assetsService.getStudentBachelorThesisRegistrations(studentId);

        return result.map(item => this.mapper.map(BachelorThesisRegistrationInfoDto, item));
    }

    async getStudentBachelorThesisAssessments(studentId: string, checkStudent: boolean = true)
        : Promise<BachelorThesisAssessmentInfoDto[]> {
        if (checkStudent) {
            await this.ensureStudentExists(studentId);
        }

        const result = await this.assetsService.getStudentBachelorThesisAssessments(studentId);

        return result.map(item => this.mapper.map(BachelorThesisAssessmentInfoDto, item));
    }

    async getStudentBachelorThesisEvaluations(studentId: string, checkStudent: boolean = true)
        : Promise<BachelorThesisEvaluationInfoDto[]> {
        if (checkStudent) {
            await this.ensureStudentExists(studentId);
        }

        const result = await this.assetsService.getStudentBachelorThesisEvaluations(studentId);

        return result.map(item => this.mapper.map(BachelorThesisEvaluationInfoDto, item));
    }

    async getStudentOralDefenseRegistrations(studentId: string, checkStudent: boolean = true)
        : Promise<OralDefenseRegistrationInfoDto[]> {
        if (checkStudent) {
            await this.ensureStudentExists(studentId);
        }
        
        const result = await this.assetsService.getStudentOralDefenseRegistrations(studentId);

        return result.map(item => this.mapper.map(OralDefenseRegistrationInfoDto, item));
    }

    async getStudentOralDefenseAssessments(studentId: string, checkStudent: boolean = true)
        : Promise<OralDefenseAssessmentInfoDto[]> {
        await this.ensureStudentExists(studentId);
        
        const result = await this.assetsService.getStudentOralDefenseAssessments(studentId);

        return result.map(item => this.mapper.map(OralDefenseAssessmentInfoDto, item));
    }

    async updateStudentInfo(studentId: string, updateRequest: StudentInfoUpdateRequest): Promise<StudentInfoDto> {
        const result = await this.studentRepo.update(studentId, updateRequest);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.StudentNotFound);
        }

        return this.mapper.map(StudentInfoDto, result);
    }

    async createThesisRequest(user: AuthorizedUser, request: ThesisRequestCreateRequest): Promise<RequestStateInfoDto> {
        await this.ensureLatestRequestDeletable(user);

        const process = await getThesisProcessOrThrow(this.processRepo);
        const createdRequest = await this.requestService.createRequest(user.userId, process.id, request.title);
        if (!createdRequest) {
            throw new UnexpectedError(ERROR_MESSAGES.Unexpected.RequestCreationFailed);
        }

        return createdRequest;
    }

    async getLatestCreatedRequestState(userId: string): Promise<RequestStateInfoDto> {
        const createdRequests = await this.requestService.getCreatedRequestStatesLatestToOldest(userId);
        const createdRequest = firstOrDefault(createdRequests);
        if (!createdRequest) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.RequestNotFound);
        }

        return createdRequest;
    }

    private async ensureStudentExists(studentId: string) {
        const result = await this.studentRepo.findOneById(studentId);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.StudentNotFound);
        }
        return result;
    }

    private async ensureLatestRequestDeletable(user: AuthorizedUser) {
        const attempts = await this.studentAttemptRepo.findManyByStudentId(user.userId);
        if (attempts.length === 0) {
            return;
        }

        const { requestId } = attempts.reduce((attempt1, attempt2) => {
            return attempt1.attemptNo > attempt2.attemptNo ? attempt1 : attempt2;
        });
        
        if (typeof requestId !== 'string') {
            return;
        }

        const request = await this.requestService.getRequestState(user, requestId);
        if (!request.isDeletable) {
            throw new ConflictError(ERROR_MESSAGES.Conflict.LatestAttemptRequestIsInProgress);
        }
    }
}