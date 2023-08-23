import { inject, injectable } from "inversify";
import { 
    Authorized,
    Body,
    CurrentUser,
    Delete,
    Get,
    HttpCode, 
    JsonController, 
    OnUndefined, 
    Param, 
    Post,
    QueryParams,
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { HTTP_CODES } from "../../core/constants/http-codes";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { UserServiceInterface } from "../interfaces";
import { ROLES } from '../../core/constants/roles';
import { UserInfoUpdateRequest } from '../../contracts/requests/auth/user-info-update.request';
import { AuthorizedUser } from '../../core/auth-checkers';
import { UserInfoDto } from '../../shared/dtos';
import { UserInfosQueryRequest } from "../../contracts/requests/auth/user-infos-query.request";
import { UserInfosQueryResponse } from "../../contracts/responses/auth/user-infos-query.response";

@JsonController('users')
@Authorized(ROLES.Admin)
@injectable()
@OpenAPI({
    security: [{ bearerAuth: [] }]
})
export class UserController {
    constructor(@inject(INJECTION_TOKENS.UserService) private userService: UserServiceInterface) {

    }

    @HttpCode(HTTP_CODES.Ok)
    @Get()
    @ResponseSchema(UserInfosQueryResponse)
    getUsers(@CurrentUser() currentUser: AuthorizedUser, @QueryParams() queryRequest: UserInfosQueryRequest) {
        return this.userService.getUsers(currentUser, queryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Post('/:id')
    @ResponseSchema(UserInfoDto)
    public updateUser(@CurrentUser() currentUser: AuthorizedUser, @Param('id') userId: string, 
        @Body({ required: true }) updateRequest: UserInfoUpdateRequest) {
        return this.userService.updateUser(currentUser, userId, updateRequest);
    }

    @Delete('/:id')
    @OnUndefined(HTTP_CODES.NoContent)
    public deleteUser(@CurrentUser() currentUser: AuthorizedUser, @Param('id') userId: string) {
        return this.userService.deleteUser(currentUser, userId);
    }
}