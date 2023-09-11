import { RequestInfosQueryRequest } from "../../contracts/requests";
import { RequestActionSubmitRequest } from "../../contracts/requests/api/request-action-submit.request";
import { RequestInfosQueryResponse } from "../../contracts/responses";
import { AuthorizedUser } from "../../core/auth-checkers";
import { RequestStateInfoDto } from "../../shared/dtos";

export interface RequestServiceInterface {
    getRequests(user: AuthorizedUser, queryRequest: RequestInfosQueryRequest): Promise<RequestInfosQueryResponse>;
    getRequestState(user: AuthorizedUser, id: string): Promise<RequestStateInfoDto>;
    deleteRequest(user: AuthorizedUser, id: string): Promise<void>;

    submitAction(actionerId: string, request: RequestActionSubmitRequest): Promise<RequestStateInfoDto | undefined>;

    createThesisRequest(userId: string, requestTitle: string): Promise<RequestStateInfoDto | undefined>;
    getCreatedRequestStatesLatestToOldest(creatorId: string): Promise<RequestStateInfoDto[]>;
}