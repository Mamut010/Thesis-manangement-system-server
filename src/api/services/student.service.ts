import { inject, injectable } from "inversify";
import { StudentServiceInterface } from "../interfaces/student.service.interface";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { WorkflowEngineInterface } from "../others/workflow";
import { RequestStateInfoDto } from "../../shared/dtos";
import { ProcessRepo } from "../../dal/repositories";
import { ProcessesQueryRequest } from "../../contracts/requests";
import { firstOrDefault } from "../../utils/array-helpers";
import { UnexpectedError } from "../../contracts/errors/unexpected.error";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { ThesisRequestCreateRequest } from "../../contracts/requests/api/thesis-request-create.request";
import { StudentRepoInterface } from "../../dal/interfaces";
import { AssetsServiceInterface, RequestServiceInterface } from "../interfaces";
import { MapperServiceInterface } from "../../shared/interfaces";
import { StudentMaintainerService } from "./student-maintainer.service";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { getThesisProcessOrThrow } from "../../utils/process-helpers";

@injectable()
export class StudentService extends StudentMaintainerService implements StudentServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.StudentRepo) studentRepo: StudentRepoInterface,
        @inject(INJECTION_TOKENS.AssetsService) assetsService: AssetsServiceInterface,
        @inject(INJECTION_TOKENS.MapperService) mapper: MapperServiceInterface,
        @inject(INJECTION_TOKENS.WorkflowEngine) private workflowEngine: WorkflowEngineInterface,
        @inject(INJECTION_TOKENS.RequestService) private requestService: RequestServiceInterface) {
        super(studentRepo, assetsService, mapper);
    }

    async createThesisRequest(userId: string, request: ThesisRequestCreateRequest): Promise<RequestStateInfoDto> {
        const createdRequest = await this.requestService.createThesisRequest(userId, request.title);
        if (!createdRequest) {
            throw new UnexpectedError(ERROR_MESSAGES.Unexpected.RequestCreationFailed);
        }

        return createdRequest;
    }

    async getCreatedRequestState(userId: string): Promise<RequestStateInfoDto> {
        const createdRequests = await this.requestService.getCreatedRequestStates(userId);
        const createdRequest = firstOrDefault(createdRequests);
        if (!createdRequest) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.RequestNotFound);
        }

        return createdRequest;
    }
}