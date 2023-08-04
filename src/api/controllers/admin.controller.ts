import { 
    Authorized, 
    CurrentUser, 
    Get, 
    HttpCode, 
    JsonController 
} from "routing-controllers";
import { ROLES } from "../../core/constants/roles";
import { inject, injectable } from "inversify";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { AdminServiceInterface } from "../interfaces";
import { HTTP_CODES } from "../../core/constants/http-codes";
import { AdminInfoDto } from "../../shared/dtos";
import { User } from "../../core/models";

@JsonController('admin')
@Authorized(ROLES.Admin)
@injectable()
@OpenAPI({
    security: [{ bearerAuth: [] }]
})
export class AdminController {
    constructor(
        @inject(INJECTION_TOKENS.AdminService) private adminService: AdminServiceInterface) {

    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/info')
    @ResponseSchema(AdminInfoDto)
    getAdminInfo(@CurrentUser({ required: true }) user: User) {
        return this.adminService.getAdminInfo(user.userId);
    }
}