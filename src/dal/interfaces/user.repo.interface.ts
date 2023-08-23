import { UserCreateRequest, UserUpdateRequest, UsersQueryRequest } from "../../contracts/requests";
import { UsersQueryResponse } from "../../contracts/responses";
import { UserDto } from "../../shared/dtos";

export interface UserRepoInterface {
    query(queryRequest: UsersQueryRequest): Promise<UsersQueryResponse>;

    findOneById(id: string): Promise<UserDto | null>;

    findManyByIds(ids: string[]): Promise<UserDto[]>;

    create(createRequest: UserCreateRequest): Promise<UserDto>;

    update(id: string, updateRequest: UserUpdateRequest): Promise<UserDto | null>;

    delete(id: string): Promise<boolean>;
}