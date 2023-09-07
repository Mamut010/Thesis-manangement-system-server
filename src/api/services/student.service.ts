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

@injectable()
export class StudentService implements StudentServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.ProcessRepo) private processRepo: ProcessRepo,
        @inject(INJECTION_TOKENS.WorkflowEngine) private workflowEngine: WorkflowEngineInterface) {

    }

    async createThesisRequest(userId: string, request: ThesisRequestCreateRequest): Promise<RequestStateInfoDto | undefined> {
        const processesQuery = new ProcessesQueryRequest();
        const queryResponse = await this.processRepo.query(processesQuery);
        
        // For now, just assume that the very first process is the thesis management process
        const process = firstOrDefault(queryResponse.content);
        if (!process) {
            throw new UnexpectedError(ERROR_MESSAGES.Unexpected.DefaultMessage);
        }

        return await this.workflowEngine.createRequest({
            processId: process.id,
            userId: userId,
            title: request.title
        }) ?? undefined;
    }
}