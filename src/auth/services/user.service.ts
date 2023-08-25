import { inject, injectable } from "inversify";
import { AuthServiceInterface, UserServiceInterface } from "../interfaces";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { UserRepoInterface } from "../../dal/interfaces";
import { UserInfoUpdateRequest, UserInfosQueryRequest } from "../../contracts/requests";
import { UserInfosQueryResponse } from "../../contracts/responses";
import { UserInfoDto } from "../../shared/dtos";
import { plainToInstanceExactMatch } from "../../utils/class-transformer-helpers";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { AuthorizedUser } from "../../core/auth-checkers";
import { ForbiddenError } from "../../contracts/errors/forbidden.error";
import { ROLES } from "../../core/constants/roles";
import { equalsOrUndefined } from "../../utils/object-helpers";

@injectable()
export class UserService implements UserServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.UserRepo) private userRepo: UserRepoInterface,
        @inject(INJECTION_TOKENS.AuthService) private authService: AuthServiceInterface) {

    }

    async getUsers(currentUser: AuthorizedUser, queryRequest: UserInfosQueryRequest): Promise<UserInfosQueryResponse> {
        this.decryptQueryRequestCredentials(queryRequest);
        const result = await this.userRepo.query(queryRequest);
        return {
            content: result.content.map(item => plainToInstanceExactMatch(UserInfoDto, item)),
            count: result.count
        };
    }

    async getUser(currentUser: AuthorizedUser, userId: string): Promise<UserInfoDto> {
        const result = await this.ensureRecordExists(userId);
        return plainToInstanceExactMatch(UserInfoDto, result);
    }

    async updateUser(currentUser: AuthorizedUser, userId: string, updateRequest: UserInfoUpdateRequest)
        : Promise<UserInfoDto> {
        const record = await this.ensureRecordExists(userId);

        // If intending to update an admin account
        if (record.roleName === ROLES.Admin && (
            // An admin account is not allowed to modify another admin account
            currentUser.userId !== record.userId 
            // An admin account's role cannot be changed
            || !equalsOrUndefined(updateRequest.roleId, record.roleId)
            // An admin account's userId is not modifyable on application level
            || !equalsOrUndefined(updateRequest.userId, record.userId))) 
        {
            throw new ForbiddenError(ERROR_MESSAGES.Forbidden.UnpermittedAction);
        }

        this.authService.tryDecryptCredentials(updateRequest, true);
        const result = await this.userRepo.update(userId, updateRequest);
        return plainToInstanceExactMatch(UserInfoDto, result);
    }

    async deleteUser(currentUser: AuthorizedUser, userId: string): Promise<void> {
        const record = await this.ensureRecordExists(userId);
        // Admin accounts are not deletable on application level
        if (record.roleName === ROLES.Admin) {
            throw new ForbiddenError(ERROR_MESSAGES.Forbidden.UnpermittedAction);
        }

        await this.userRepo.delete(userId);
    }

    private decryptQueryRequestCredentials(queryRequest: UserInfosQueryRequest) {
        if (!queryRequest.usernameFilter) {
            return;
        }

        queryRequest.usernameFilter.forEach(filter => {
            const decryptedCredentials = this.authService.tryDecryptCredentials({ username: filter.value });
            filter.value = decryptedCredentials?.username ?? filter.value;
        });
    }

    private async ensureRecordExists(userId: string) {
        const result = await this.userRepo.findOneById(userId);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.UserNotFound);
        }
        return result;
    }
}