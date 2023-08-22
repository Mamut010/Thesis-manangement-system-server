import { AuthUserUpdateRequest } from "../../contracts/requests/auth/auth-user-update.request";
import { AuthUsersQueryRequest } from "../../contracts/requests/auth/auth-users-query.request";
import { AuthUsersQueryResponse } from "../../contracts/responses/auth/auth-users-query.response";
import { AuthorizedUser } from "../../core/auth-checkers";
import { UserInfoDto } from "../../shared/dtos";

export interface UserServiceInterface {
    getUsers(currentUser: AuthorizedUser, queryRequest: AuthUsersQueryRequest): Promise<AuthUsersQueryResponse>;
    updateUser(currentUser: AuthorizedUser, userId: string, updateRequest: AuthUserUpdateRequest): Promise<UserInfoDto>;
    deleteUser(currentUser: AuthorizedUser, userId: string): Promise<void>;
}