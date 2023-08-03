import { 
    Authorized, 
    Get, 
    HttpCode, 
    JsonController, 
    Param, 
    QueryParams
} from "routing-controllers";
import { ROLES } from "../../core/constants/roles";
import { inject, injectable } from "inversify";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { AdminThesisServiceInterface } from "../interfaces";
import { HTTP_CODES } from "../../core/constants/http-codes";
import { ThesisInfoDto } from "../../shared/dtos";
import { ThesesQueryResponse } from "../../contracts/responses/theses-query.response";
import { ThesesQueryRequest } from "../../contracts/requests/theses-query.request";

@JsonController('admin/theses')
//@Authorized(ROLES.Admin)
@injectable()
@OpenAPI({
    security: [{ bearerAuth: [] }]
})
export class AdminThesisController {
    constructor(
        @inject(INJECTION_TOKENS.AdminThesisService) private adminThesisService: AdminThesisServiceInterface) {

    }

    @HttpCode(HTTP_CODES.Ok)
    @Get()
    @ResponseSchema(ThesesQueryResponse)
    getTheses(@QueryParams() thesesQuery: ThesesQueryRequest) {
        return this.adminThesisService.getTheses(thesesQuery);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/thesis-info')
    @ResponseSchema(ThesisInfoDto)
    getThesisInfo(@Param('id') id: number) {
        return this.adminThesisService.getThesisInfo(id);
    }
}