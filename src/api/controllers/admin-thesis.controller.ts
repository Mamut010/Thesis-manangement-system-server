import { 
    Authorized, 
    Body, 
    Delete, 
    Get, 
    HttpCode, 
    JsonController, 
    OnUndefined, 
    Param, 
    Post, 
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
import { ThesisCreateRequest } from "../../contracts/requests/thesis-create.request";
import { ThesisUpdateRequest } from "../../contracts/requests/thesis-update.request";

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

    @HttpCode(HTTP_CODES.Created)
    @Post()
    @ResponseSchema(ThesisInfoDto)
    createThesis(@Body({ required: true }) createRequest: ThesisCreateRequest) {
        return this.adminThesisService.createThesis(createRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Post('/{id}')
    @ResponseSchema(ThesisInfoDto)
    updateThesis(@Param('id') id: number, @Body({ required: true }) updateRequest: ThesisUpdateRequest) {
        return this.adminThesisService.updateThesis(id, updateRequest);
    }

    @Delete('/{id}')
    @OnUndefined(HTTP_CODES.NoContent)
    deleteThesis(@Param('id') id: number) {
        return this.adminThesisService.deleteThesis(id);
    }
}