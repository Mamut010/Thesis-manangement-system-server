import { inject, injectable } from "inversify";
import { RequestInfosQueryRequest, RequestsQueryRequest } from "../../contracts/requests";
import { RequestInfosQueryResponse } from "../../contracts/responses";
import { RequestServiceInterface } from "../interfaces/request.service.interface";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { RequestRepoInterface } from "../../dal/interfaces";
import { MapperServiceInterface } from "../../shared/interfaces";
import { RequestInfoDto, RequestStateInfoDto } from "../../shared/dtos";
import { AuthorizedUser } from "../../core/auth-checkers";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { ForbiddenError } from "routing-controllers";
import { isAdmin } from "../../utils/role-predicates";
import { 
    RequestStateDto,
    WorkflowCommandFactoryInterface, 
    WorkflowCommandInvokerInterface, 
    WorkflowEngineInterface 
} from "../others/workflow";
import { RequestActionSubmitRequest } from "../../contracts/requests/api/request-action-submit.request";
import { BadRequestError } from "../../contracts/errors/bad-request.error";
import { OrderBy, StringFilter } from "../../lib/query";
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

        const response = await this.requestRepo.query({
            ...queryRequest,
            stakeholderIdFilter: makeArray(stakeholderIdFilter)
        });
        return {
            content: this.mapper.map(RequestInfoDto, response.content),
            count: response.count,
        }
    }

    async getRequestState(user: AuthorizedUser, id: string): Promise<RequestStateInfoDto> {
        const record = await this.ensureRecordExists(id);
        if (!isAdmin(user) && !record.stakeholderIds.includes(user.userId)) {
            throw new ForbiddenError(ERROR_MESSAGES.Forbidden.RequestDenied);
        }

        const requestState = await this.workflowEngine.getRequestState(user.userId, id);
        return this.makeRequestStateInfo(record, requestState);
    }

    async deleteRequest(user: AuthorizedUser, id: string): Promise<void> {
        const record = await this.ensureRecordExists(id);
        if (!isAdmin(user) && record.creatorId !== user.userId) {
            throw new ForbiddenError(ERROR_MESSAGES.Forbidden.RequestDenied);
        }

        await this.requestRepo.delete(id);
    }

    async getCreatedRequestStates(creatorId: string): Promise<RequestStateInfoDto[]> {
        const creatorIdFilter = new StringFilter();
        creatorIdFilter.value = creatorId;
        creatorIdFilter.operator = 'equals';

        // Sortest from latest to oldest
        const orderByUpdatedAt = new OrderBy();
        orderByUpdatedAt.field = 'updatedAt';
        orderByUpdatedAt.dir = 'desc';

        const query = new RequestsQueryRequest();
        query.creatorIdFilter = makeArray(creatorIdFilter);
        query.orderBy = makeArray(orderByUpdatedAt);

        const { content } = await this.requestRepo.query(query);
        const requestStates = await this.workflowEngine.getRequestStates(creatorId, content.map(item => item.id));

        return content.map((request, index) => this.makeRequestStateInfo(request, requestStates[index]));
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

        const requestState = await this.workflowCommandInvoker.invoke();
        const record = await this.ensureRecordExists(request.requestId);

        return this.makeRequestStateInfo(record, requestState);
    }

    private async ensureRecordExists(id: string) {
        const result = await this.requestRepo.findOneById(id);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.RequestNotFound);
        }
        return result;
    }

    private makeRequestStateInfo(request: RequestInfoDto, requestState?: RequestStateDto | null) {
        const result = this.mapper.map(RequestStateInfoDto, request);
        result.actionTypes = requestState?.actionTypes ?? [];
        return result;
    }
}