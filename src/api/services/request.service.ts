import { inject, injectable } from "inversify";
import { RequestInfosQueryRequest } from "../../contracts/requests";
import { RequestInfosQueryResponse } from "../../contracts/responses";
import { RequestServiceInterface } from "../interfaces/request.service.interface";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { RequestRepoInterface } from "../../dal/interfaces";
import { MapperServiceInterface } from "../../shared/interfaces";
import { RequestDto, RequestInfoDto, RequestStateInfoDto } from "../../shared/dtos";
import { AuthorizedUser } from "../../core/auth-checkers";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { ForbiddenError } from "routing-controllers";
import { isAdmin } from "../../utils/role-predicates";
import { 
    WorkflowCommandFactoryInterface, 
    WorkflowCommandInvokerInterface, 
    WorkflowEngineInterface 
} from "../others/workflow";
import { RequestActionSubmitRequest } from "../../contracts/requests/api/request-action-submit.request";
import { BadRequestError } from "../../contracts/errors/bad-request.error";
import { StringFilter } from "../../lib/query";
import { makeArray } from "../../utils/array-helpers";

@injectable()
export class RequestService implements RequestServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.RequestRepo) private requestRepo: RequestRepoInterface,
        @inject(INJECTION_TOKENS.MapperService) private mapper: MapperServiceInterface,
        @inject(INJECTION_TOKENS.WorkflowEngine) private workflowEngine: WorkflowEngineInterface,
        @inject(INJECTION_TOKENS.WorkflowCommandFactory) private workflowCommandFactory: WorkflowCommandFactoryInterface,
        @inject(INJECTION_TOKENS.WorkflowCommandInvoker) private workflowCommandInvoker: WorkflowCommandInvokerInterface) {

    }

    async getRequests(user: AuthorizedUser, queryRequest: RequestInfosQueryRequest): Promise<RequestInfosQueryResponse> {
        // Only show relavant requests
        const stakeholderIdFilter = new StringFilter();
        stakeholderIdFilter.value = user.userId;
        stakeholderIdFilter.operator = 'equals';

        const result = await this.requestRepo.query({
            ...queryRequest,
            stakeholderIdFilter: makeArray(stakeholderIdFilter)
        });
        return {
            content: this.mapper.map(RequestInfoDto, result.content),
            count: result.count,
        }
    }

    async getRequest(user: AuthorizedUser, id: string): Promise<RequestInfoDto> {
        const result = await this.ensureRecordExists(id);
        this.ensureValidAction(user, result);
        
        return this.mapper.map(RequestInfoDto, result);
    }

    async deleteRequest(user: AuthorizedUser, id: string): Promise<void> {
        const record = await this.ensureRecordExists(id);
        this.ensureValidAction(user, record);

        await this.requestRepo.delete(id);
    }

    async submitAction(actionerId: string, request: RequestActionSubmitRequest): Promise<RequestStateInfoDto | undefined> {
        const command = this.workflowCommandFactory.createCommand(this.workflowEngine, request.actionType, {
            actionerId: actionerId,
            requestId: request.requestId,
            data: request.data,
        });
        if (!command) {
            throw new BadRequestError(ERROR_MESSAGES.Invalid.InputInvalid);
        }

        this.workflowCommandInvoker.setCommand(command);
        const result = await this.workflowCommandInvoker.invoke();
        return result ? this.mapper.map(RequestStateInfoDto, result) : undefined;
    }

    private async ensureRecordExists(id: string) {
        const result = await this.requestRepo.findOneById(id);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.RequestNotFound);
        }
        return result;
    }

    private ensureValidAction(user: AuthorizedUser, record: RequestDto) {
        const isValid = isAdmin(user) || record.stakeholderIds.includes(user.userId);
        if (!isValid) {
            throw new ForbiddenError(ERROR_MESSAGES.Forbidden.RequestDenied);
        }
    }
}