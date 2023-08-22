import { inject, injectable } from "inversify";
import { UserServiceInterface } from "../interfaces";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { UserRepoInterface } from "../../dal/interfaces";
import { AuthUserUpdateRequest } from "../../contracts/requests/auth/auth-user-update.request";
import { AuthUsersQueryRequest } from "../../contracts/requests/auth/auth-users-query.request";
import { AuthUsersQueryResponse } from "../../contracts/responses/auth/auth-users-query.response";
import { UserDto, UserOutputDto } from "../../shared/dtos";
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
        @inject(INJECTION_TOKENS.UserRepo) private userRepo: UserRepoInterface) {

    }

    async getUsers(currentUser: AuthorizedUser, queryRequest: AuthUsersQueryRequest): Promise<AuthUsersQueryResponse> {
        const users = await this.userRepo.query(queryRequest);
        return {
            content: users.content.map(item => plainToInstanceExactMatch(UserOutputDto, item)),
            count: users.count
        }
    }

    async updateUser(currentUser: AuthorizedUser, userId: string, updateRequest: AuthUserUpdateRequest)
        : Promise<UserOutputDto> {
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

        const result = await this.userRepo.update(userId, updateRequest);
        return plainToInstanceExactMatch(UserOutputDto, result);
    }

    async deleteUser(currentUser: AuthorizedUser, userId: string): Promise<void> {
        const record = await this.ensureRecordExists(userId);
        // Admin accounts are not deletable on application level
        if (record.roleName === ROLES.Admin) {
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
}