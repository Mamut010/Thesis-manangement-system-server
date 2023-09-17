import { inject, injectable } from "inversify";
import { GroupsQueryRequest, RequestInfosQueryRequest, RequestsQueryRequest } from "../../contracts/requests";
import { RequestInfosQueryResponse } from "../../contracts/responses";
import { RequestServiceInterface } from "../interfaces/request.service.interface";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { GroupRepoInterface, RequestRepoInterface } from "../../dal/interfaces";
import { MapperServiceInterface } from "../../shared/interfaces";
import { RequestDto, RequestInfoDto, RequestStateInfoDto } from "../../shared/dtos";
import { AuthorizedUser } from "../../core/auth-checkers";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { ForbiddenError } from "routing-controllers";
import { isAdmin } from "../../utils/role-predicates";
import { 
    RequestStateDto,
    StateType,
    WorkflowCommandFactoryInterface, 
    WorkflowCommandInvokerInterface, 
    WorkflowEngineInterface 
} from "../others/workflow";
import { RequestActionSubmitRequest } from "../../contracts/requests/api/request-action-submit.request";
import { BadRequestError } from "../../contracts/errors/bad-request.error";
import { OrderBy, StringFilter } from "../../lib/query";
import { makeArray } from "../../utils/array-helpers";
import { MethodNotAllowedError } from "../../contracts/errors/method-not-allowed.error";

@injectable()
export class RequestService implements RequestServiceInterface {
    private static NON_DELETABLE_STATE_TYPES = [StateType.Initial, StateType.Normal] as const;

    constructor(
        @inject(INJECTION_TOKENS.RequestRepo) private requestRepo: RequestRepoInterface,
        @inject(INJECTION_TOKENS.GroupRepo) private groupRepo: GroupRepoInterface,
        @inject(INJECTION_TOKENS.MapperService) private mapper: MapperServiceInterface,
        @inject(INJECTION_TOKENS.WorkflowEngine) private workflowEngine: WorkflowEngineInterface,
        @inject(INJECTION_TOKENS.WorkflowCommandFactory) private workflowCommandFactory: WorkflowCommandFactoryInterface,
        @inject(INJECTION_TOKENS.WorkflowCommandInvoker) private workflowCommandInvoker: WorkflowCommandInvokerInterface) {

    }

    async getRequests(user: AuthorizedUser, queryRequest: RequestInfosQueryRequest): Promise<RequestInfosQueryResponse> {
        // Only show relavant requests if user is not Admin
        let stakeholderIdFilter: StringFilter[] | undefined = undefined;
        if (!isAdmin(user)) {
            const filter = new StringFilter();
            filter.value = user.userId;
            filter.operator = 'equals';
            stakeholderIdFilter = makeArray(filter);
        }

        const response = await this.requestRepo.query({
            ...queryRequest,
            stakeholderIdFilter
        });
        return {
            content: response.content.map(item => {
                const dto = this.mapper.map(RequestInfoDto, item);
                dto.isDeletable = this.isDeletableStateType(dto.stateType);
                return dto;
            }),
            count: response.count,
        }
    }

    async getRequestState(user: AuthorizedUser, id: string): Promise<RequestStateInfoDto> {
        const record = await this.ensureRecordExists(id);
        await this.ensureValidRequestAccess(user, record.userStakeholderIds, record.groupStakeholderIds);

        const requestState = await this.workflowEngine.getRequestState(user.userId, id);
        return this.makeRequestStateInfo(record, requestState);
    }

    async deleteRequest(user: AuthorizedUser, id: string): Promise<void> {
        const record = await this.ensureRecordExists(id);

        if (!this.isDeletableStateType(record.stateType)) {
            throw new MethodNotAllowedError(ERROR_MESSAGES.MethodNotAllowed.RequestCurrentlyUndeletable);
        }
        // Only admin or the creator is allowed to delete the request
        else if (!isAdmin(user) && record.creatorId !== user.userId) {
            throw new ForbiddenError(ERROR_MESSAGES.Forbidden.RequestDenied);
        }

        await this.requestRepo.delete(id);
    }

    async submitAction(user: AuthorizedUser, request: RequestActionSubmitRequest): Promise<RequestStateInfoDto | undefined> {
        let record = await this.ensureRecordExists(request.requestId);
        await this.ensureValidRequestAccess(user, record.userStakeholderIds, record.groupStakeholderIds);

        const command = this.workflowCommandFactory.createCommand(this.workflowEngine, request.actionType, {
            actionerId: user.userId,
            requestId: request.requestId,
            data: request.data,
        });
        if (!command) {
            throw new BadRequestError(ERROR_MESSAGES.Invalid.InputInvalid);
        }

        this.workflowCommandInvoker.setCommand(command);
        const requestState = await this.workflowCommandInvoker.invoke();
        if (!requestState) {
            throw new BadRequestError(ERROR_MESSAGES.Invalid.InputInvalid);
        }

        record = await this.ensureRecordExists(request.requestId);

        return this.makeRequestStateInfo(record, requestState);
    }

    async createRequest(userId: string, processId: string, requestTitle: string)
        : Promise<RequestStateInfoDto | undefined> {
        const requestState = await this.workflowEngine.createRequest({
            processId: processId,
            userId: userId,
            title: requestTitle
        });
        if (!requestState) {
            return undefined;
        }

        const record = await this.ensureRecordExists(requestState.id);

        return this.makeRequestStateInfo(record, requestState);
    }

    async getCreatedRequestStatesLatestToOldest(creatorId: string): Promise<RequestStateInfoDto[]> {
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

    private async ensureRecordExists(id: string) {
        const result = await this.requestRepo.findOneById(id);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.RequestNotFound);
        }
        return result;
    }

    private async ensureValidRequestAccess(user: AuthorizedUser, userStakeholderIds: string[], groupStakeholderIds: string[]) {
        /**
         * Only those who are:
         *      - Admins
         *      - Direct user stakeholders
         *      - members of a group stakeholder (indirect stakeholders)
         * 
         * Are allowed to see a specific request's state. 
         */
        if (!isAdmin(user) 
            && !this.isUserDirectStakeholder(user.userId, userStakeholderIds)
            && !await this.isUserGroupStakeholder(user.userId, groupStakeholderIds)) {
            throw new ForbiddenError(ERROR_MESSAGES.Forbidden.RequestDenied);
        }
    }

    private isUserDirectStakeholder(userId: string, userStakeholderIds: string[]) {
        return userStakeholderIds.includes(userId);
    }

    private async isUserGroupStakeholder(userId: string, groupStakeholderIds: string[]) {
        const queryRequest = new GroupsQueryRequest();
        queryRequest.idFilter = groupStakeholderIds.map(item => {
            const filter = new StringFilter();
            filter.value = item;
            filter.operator = 'equals';
            return filter;
        });
        const { content } = await this.groupRepo.query(queryRequest);
        return content.find(item => item.memberIds.includes(userId)) !== undefined;
    }

    private makeRequestStateInfo(request: RequestDto, requestState: RequestStateDto | null) {
        const result = this.mapper.map(RequestStateInfoDto, request);
        result.actionTypes = requestState?.actionTypes ?? [];
        result.isDeletable = this.isDeletableStateType(request.stateType);
        return result;
    }

    private isDeletableStateType(requestStateType: StateType) {
        return !RequestService.NON_DELETABLE_STATE_TYPES.some(item => item === requestStateType);
    }
}