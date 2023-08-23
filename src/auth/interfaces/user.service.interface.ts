import { UserInfoUpdateRequest } from "../../contracts/requests";
import { UserInfosQueryRequest } from "../../contracts/requests";
import { UserInfosQueryResponse } from "../../contracts/responses";
import { AuthorizedUser } from "../../core/auth-checkers";
import { UserInfoDto } from "../../shared/dtos";

export interface UserServiceInterface {
    getUsers(currentUser: AuthorizedUser, queryRequest: UserInfosQueryRequest): Promise<UserInfosQueryResponse>;
    updateUser(currentUser: AuthorizedUser, userId: string, updateRequest: UserInfoUpdateRequest): Promise<UserInfoDto>;
    deleteUser(currentUser: AuthorizedUser, userId: string): Promise<void>;
}