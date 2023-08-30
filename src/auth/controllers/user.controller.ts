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
    Patch, 
    Post,
    QueryParams,
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { HTTP_CODES } from "../../core/constants/http-codes";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { UserServiceInterface } from "../interfaces";
import { Role } from '../../core/constants/roles';
import { UserInfoUpdateRequest, UserInfosQueryRequest } from '../../contracts/requests';
import { AuthorizedUser } from '../../core/auth-checkers';
import { UserInfoDto } from '../../shared/dtos';
import { UserInfosQueryResponse } from "../../contracts/responses";
import { UserInfoCreateRequest } from "../../contracts/requests/auth/user-info-create.request";

@JsonController('users')
@Authorized(Role.Admin)
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
    @Get('/:id')
    @ResponseSchema(UserInfoDto)
    getUser(@CurrentUser() currentUser: AuthorizedUser, @Param('id') id: string) {
        return this.userService.getUser(currentUser, id);
    }

    @HttpCode(HTTP_CODES.Created)
    @Post()
    @ResponseSchema(UserInfoDto)
    public createUser(@CurrentUser() currentUser: AuthorizedUser, 
        @Body({ required: true }) createRequest: UserInfoCreateRequest) {
        return this.userService.createUser(currentUser, createRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Patch('/:id')
    @ResponseSchema(UserInfoDto)
    public updateUser(@CurrentUser() currentUser: AuthorizedUser, @Param('id') id: string, 
        @Body({ required: true }) updateRequest: UserInfoUpdateRequest) {
        return this.userService.updateUser(currentUser, id, updateRequest);
    }

    @Delete('/:id')
    @OnUndefined(HTTP_CODES.NoContent)
    public deleteUser(@CurrentUser() currentUser: AuthorizedUser, @Param('id') id: string) {
        return this.userService.deleteUser(currentUser, id);
    }
}