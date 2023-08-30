import { Request, Response } from 'express';
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
    Post,
    Req,
    Res
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { HTTP_CODES } from "../../core/constants/http-codes";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { LoginRequest, SignUpRequest } from "../../contracts/requests";
import { AuthServiceInterface } from "../interfaces";
import { Role } from '../../core/constants/roles';
import { StringResponse, StringArrayResponse } from '../../contracts/responses';
import { AuthorizedUser } from '../../core/auth-checkers';
import { UserInfoDto } from '../../shared/dtos';

@JsonController()
@injectable()
@OpenAPI({
    security: [{ bearerAuth: [] }] // Applied to each method
})
export class AuthController {
    constructor(@inject(INJECTION_TOKENS.AuthService) private authService: AuthServiceInterface) {

    }

    @HttpCode(HTTP_CODES.Created)
    @Post('login')
    @ResponseSchema(StringResponse)
    public login(@Res() res: Response, @Body({ required: true }) loginRequest: LoginRequest) {
        return this.authService.login(res, loginRequest);
    }

    @Authorized(Role.Admin)
    @HttpCode(HTTP_CODES.Ok)
    @Post('signup')
    @ResponseSchema(UserInfoDto)
    public signUp(@Body({ required: true }) signUpRequest: SignUpRequest) {
        return this.authService.signup(signUpRequest);
    }

    @Authorized()
    @HttpCode(HTTP_CODES.Ok)
    @Get('roles')
    @ResponseSchema(StringArrayResponse)
    public roles(@CurrentUser() user: AuthorizedUser) {
        return this.authService.getRoles(user);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Post('token')
    @ResponseSchema(StringResponse)
    public token(@Req() req: Request, @Res() res: Response) {
        return this.authService.issueAccessToken(req, res);
    }

    @Authorized()
    @Delete('logout')
    @OnUndefined(HTTP_CODES.NoContent)
    public logout(@CurrentUser() user: AuthorizedUser, @Res() res: Response) {
        return this.authService.logout(user, res);
    }
}