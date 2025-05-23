import { 
    Authorized, 
    Body, 
    CurrentUser, 
    Get, 
    HttpCode, 
    JsonController, 
    Patch
} from "routing-controllers";
import { Role } from "../../core/constants/roles";
import { inject, injectable } from "inversify";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { AdminServiceInterface } from "../interfaces";
import { HTTP_CODES } from "../../core/constants/http-codes";
import { AdminInfoDto } from "../../shared/dtos";
import { AuthorizedUser } from "../../core/auth-checkers";
import { AdminInfoUpdateRequest } from "../../contracts/requests";

@JsonController('admin')
@Authorized(Role.Admin)
@injectable()
@OpenAPI({
    security: [{ bearerAuth: [] }]
})
export class AdminActorController {
    constructor(
        @inject(INJECTION_TOKENS.AdminService) private adminService: AdminServiceInterface) {

    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/info')
    @ResponseSchema(AdminInfoDto)
    getAdminInfo(@CurrentUser() user: AuthorizedUser) {
        return this.adminService.getAdminInfo(user.userId);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Patch('/info')
    @ResponseSchema(AdminInfoDto)
    updateAdminInfo(@CurrentUser() user: AuthorizedUser, 
        @Body({ required: true }) updateRequest: AdminInfoUpdateRequest) {
        return this.adminService.updateAdminInfo(user.userId, updateRequest);
    }
}