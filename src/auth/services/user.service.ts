import { inject, injectable } from "inversify";
import { UserServiceInterface } from "../interfaces";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { UserRepoInterface } from "../../dal/interfaces";
import { UserInfoUpdateRequest, UserInfosQueryRequest } from "../../contracts/requests";
import { UserInfosQueryResponse } from "../../contracts/responses";
import { UserInfoDto } from "../../shared/dtos";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { AuthorizedUser } from "../../core/auth-checkers";
import { ForbiddenError } from "../../contracts/errors/forbidden.error";
import { Role } from "../../core/constants/roles";
import { equalsOrUndefined } from "../../utils/object-helpers";
import { MapperServiceInterface } from "../../shared/interfaces";
import { UserInfoCreateRequest } from "../../contracts/requests/auth/user-info-create.request";
import { ConflictError } from "../../contracts/errors/conflict.error";

@injectable()
export class UserService implements UserServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.UserRepo) private userRepo: UserRepoInterface,
        @inject(INJECTION_TOKENS.MapperService) private mapper: MapperServiceInterface) {

    }

    async getUsers(currentUser: AuthorizedUser, queryRequest: UserInfosQueryRequest): Promise<UserInfosQueryResponse> {
        const result = await this.userRepo.query(queryRequest);
        return {
            content: this.mapper.map(UserInfoDto, result.content),
            count: result.count
        };
    }

    async getUser(currentUser: AuthorizedUser, userId: string): Promise<UserInfoDto> {
        const result = await this.ensureRecordExists(userId);
        return this.mapper.map(UserInfoDto, result);
    }

    async createUser(currentUser: AuthorizedUser, createRequest: UserInfoCreateRequest)
    : Promise<UserInfoDto> {
        // If intending to create an admin account
        if (createRequest.userId === Role.Admin) 
        {
            // Admin account is not creatable on application level
            throw new ForbiddenError(ERROR_MESSAGES.Forbidden.UnpermittedAction);
        }

        await this.ensureRecordNotExists(createRequest.userId);
        const result = await this.userRepo.create(createRequest);
        return this.mapper.map(UserInfoDto, result);
    }

    async updateUser(currentUser: AuthorizedUser, userId: string, updateRequest: UserInfoUpdateRequest)
        : Promise<UserInfoDto> {
        const record = await this.ensureRecordExists(userId);

        // If intending to update an admin account
        if (record.roleName === Role.Admin && (
            // An admin account is not allowed to modify another admin account
            currentUser.userId !== record.userId 
            // An admin account's role cannot be changed
            || !equalsOrUndefined(updateRequest.roleId, record.roleId)
            // An admin account's userId is not modifyable on application level
            || !equalsOrUndefined(updateRequest.userId, record.userId))) 
        {
            throw new ForbiddenError(ERROR_MESSAGES.Forbidden.UnpermittedAction);
        }

        const result = await this.userRepo.update(userId, updateRequest);
        return this.mapper.map(UserInfoDto, result);
    }

    async deleteUser(currentUser: AuthorizedUser, userId: string): Promise<void> {
        // Cannot delete self
        if (userId === currentUser.userId) {
            throw new ForbiddenError(ERROR_MESSAGES.Forbidden.UnpermittedAction);
        }

        await this.userRepo.delete(userId);
    }

    private async ensureRecordExists(userId: string) {
        const result = await this.userRepo.findOneById(userId);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.UserNotFound);
        }
        return result;
    }

    private async ensureRecordNotExists(userId: string) {
        const result = await this.userRepo.findOneById(userId);
        if (result) {
            throw new ConflictError(ERROR_MESSAGES.Conflict.UserAlreadyExists);
        }
        return result;
    }
}