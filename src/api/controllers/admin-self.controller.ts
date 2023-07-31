import { 
    Authorized, 
    CurrentUser, 
    Get, 
    HttpCode, 
    JsonController 
} from "routing-controllers";
import { Roles } from "../../core/enums/roles";
import { inject, injectable } from "inversify";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { AdminSelfServiceInterface } from "../interfaces";
import { HttpCodes } from "../../core/enums/http-codes";
import { AdminInfoDto } from "../../shared/dtos";
import { User } from "../../core/models";

@JsonController('admin/self')
@Authorized(Roles.Admin)
@injectable()
@OpenAPI({
    security: [{ bearerAuth: [] }]
})
export class AdminSelfController {
    constructor(
        @inject(INJECTION_TOKENS.AdminSelfService) private adminSelfService: AdminSelfServiceInterface) {

    }

    @HttpCode(HttpCodes.Ok)
    @Get('/info')
    @ResponseSchema(AdminInfoDto)
    getAdminInfo(@CurrentUser({ required: true }) user: User) {
        return this.adminSelfService.getAdminInfo(user.userId);
    }
}