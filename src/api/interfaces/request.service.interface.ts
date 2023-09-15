import { RequestInfosQueryRequest } from "../../contracts/requests";
import { RequestActionSubmitRequest } from "../../contracts/requests/api/request-action-submit.request";
import { RequestInfosQueryResponse } from "../../contracts/responses";
import { AuthorizedUser } from "../../core/auth-checkers";
import { RequestStateInfoDto } from "../../shared/dtos";

export interface RequestServiceInterface {
    getRequests(user: AuthorizedUser, queryRequest: RequestInfosQueryRequest): Promise<RequestInfosQueryResponse>;
    getRequestState(user: AuthorizedUser, id: string): Promise<RequestStateInfoDto>;
    deleteRequest(user: AuthorizedUser, id: string): Promise<void>;

    createRequest(userId: string, processId: string, requestTitle: string): Promise<RequestStateInfoDto | undefined>;
    submitAction(user: AuthorizedUser, request: RequestActionSubmitRequest): Promise<RequestStateInfoDto | undefined>;
    getCreatedRequestStatesLatestToOldest(creatorId: string): Promise<RequestStateInfoDto[]>;
}