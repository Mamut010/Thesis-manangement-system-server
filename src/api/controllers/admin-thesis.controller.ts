import { 
    Authorized, 
    Get, 
    HttpCode, 
    JsonController, 
    Param 
} from "routing-controllers";
import { Roles } from "../../core/enums/roles";
import { inject, injectable } from "inversify";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { AdminThesisServiceInterface } from "../interfaces";
import { HttpCodes } from "../../core/enums/http-codes";
import { ThesisInfoDto } from "../../shared/dtos";

@JsonController('admin/theses')
//@Authorized(Roles.Admin)
@injectable()
@OpenAPI({
    security: [{ bearerAuth: [] }]
})
export class AdminThesisController {
    constructor(
        @inject(INJECTION_TOKENS.AdminThesisService) private adminThesisService: AdminThesisServiceInterface) {

    }

    @HttpCode(HttpCodes.Ok)
    @Get('/:id/thesis-info')
    @ResponseSchema(ThesisInfoDto)
    getThesisInfo(@Param('id') id: number) {
        return this.adminThesisService.getThesisInfo(id);
    }
}