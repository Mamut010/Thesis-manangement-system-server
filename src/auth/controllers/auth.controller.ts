import { Request, Response } from 'express';
import { inject, injectable } from "inversify";
import { 
    Authorized,
    Body,
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
import { LoginRequest } from "../../contracts/requests/auth/login.request";
import { SignUpRequest } from "../../contracts/requests/auth/sign-up.request";
import { AuthServiceInterface } from "../interfaces";
import { ROLES } from '../../core/constants/roles';
import { StringResponse } from '../../contracts/responses/general/string.response';
import { StringArrayResponse } from '../../contracts/responses/general/string-array.response';

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
        return this.authService.login(loginRequest, res);
    }

    @Authorized(ROLES.Admin)
    @Post('signup')
    @OnUndefined(HTTP_CODES.Created)
    public signUp(@Body({ required: true }) signUpRequest: SignUpRequest) {
        return this.authService.signUp(signUpRequest);
    }

    @Authorized()
    @HttpCode(HTTP_CODES.Ok)
    @Get('roles')
    @ResponseSchema(StringArrayResponse)
    public roles(@Req() req: Request) {
        return this.authService.getRoles(req);
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
    public logout(@Req() req: Request, @Res() res: Response) {
        return this.authService.logout(req, res);
    }
}