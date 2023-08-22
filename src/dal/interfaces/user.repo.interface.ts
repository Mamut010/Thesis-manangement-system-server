import { UserCreateRequest } from "../../contracts/requests/user-create-request.dto";
import { UserUpdateRequest } from "../../contracts/requests/user-update-request.dto";
import { UsersQueryRequest } from "../../contracts/requests/users-query.request";
import { UsersQueryResponse } from "../../contracts/responses/users-query.response";
import { UserDto } from "../../shared/dtos";

export interface UserRepoInterface {
    query(queryRequest: UsersQueryRequest): Promise<UsersQueryResponse>;

    findOneById(id: string): Promise<UserDto | null>;

    findManyByIds(ids: string[]): Promise<UserDto[]>;

    create(createRequest: UserCreateRequest): Promise<UserDto>;

    update(id: string, updateRequest: UserUpdateRequest): Promise<UserDto | null>;

    delete(id: string): Promise<boolean>;
}