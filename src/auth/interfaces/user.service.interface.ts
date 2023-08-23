import { UserInfoUpdateRequest } from "../../contracts/requests/auth/user-info-update.request";
import { UserInfosQueryRequest } from "../../contracts/requests/auth/user-infos-query.request";
import { UserInfosQueryResponse } from "../../contracts/responses/auth/user-infos-query.response";
import { AuthorizedUser } from "../../core/auth-checkers";
import { UserInfoDto } from "../../shared/dtos";

export interface UserServiceInterface {
    getUsers(currentUser: AuthorizedUser, queryRequest: UserInfosQueryRequest): Promise<UserInfosQueryResponse>;
    updateUser(currentUser: AuthorizedUser, userId: string, updateRequest: UserInfoUpdateRequest): Promise<UserInfoDto>;
    deleteUser(currentUser: AuthorizedUser, userId: string): Promise<void>;
}