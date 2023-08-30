import { UserInfoUpdateRequest, UserInfosQueryRequest } from "../../contracts/requests";
import { UserInfoCreateRequest } from "../../contracts/requests/auth/user-info-create.request";
import { UserInfosQueryResponse } from "../../contracts/responses";
import { AuthorizedUser } from "../../core/auth-checkers";
import { UserInfoDto } from "../../shared/dtos";

export interface UserServiceInterface {
    getUsers(currentUser: AuthorizedUser, queryRequest: UserInfosQueryRequest): Promise<UserInfosQueryResponse>;
    getUser(currentUser: AuthorizedUser, userId: string): Promise<UserInfoDto>;
    createUser(currentUser: AuthorizedUser, createRequest: UserInfoCreateRequest): Promise<UserInfoDto>;
    updateUser(currentUser: AuthorizedUser, userId: string, updateRequest: UserInfoUpdateRequest): Promise<UserInfoDto>;
    deleteUser(currentUser: AuthorizedUser, userId: string): Promise<void>;
}