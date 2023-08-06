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
import { ROLES } from "../../../core/constants/roles";
import { inject, injectable } from "inversify";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { ThesisServiceInterface } from "../../interfaces";
import { HTTP_CODES } from "../../../core/constants/http-codes";
import { ThesisDto } from "../../../shared/dtos";
import { ThesesQueryResponse } from "../../../contracts/responses/resources/theses-query.response";
import { ThesesQueryRequest } from "../../../contracts/requests/resources/theses-query.request";
import { ThesisCreateRequest } from "../../../contracts/requests/resources/thesis-create.request";
import { ThesisUpdateRequest } from "../../../contracts/requests/resources/thesis-update.request";

@JsonController('theses')
//@Authorized()
@injectable()
@OpenAPI({
    security: [{ bearerAuth: [] }]
})
export class ThesisController {
    constructor(
        @inject(INJECTION_TOKENS.ThesisService) private thesisService: ThesisServiceInterface) {

    }

    @HttpCode(HTTP_CODES.Ok)
    @Get()
    @ResponseSchema(ThesesQueryResponse)
    getTheses(@QueryParams() thesesQuery: ThesesQueryRequest) {
        return this.thesisService.getTheses(thesesQuery);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id')
    @ResponseSchema(ThesisDto)
    getThesis(@Param('id') id: number) {
        return this.thesisService.getThesis(id);
    }

    @HttpCode(HTTP_CODES.Created)
    //@Authorized([ROLES.Admin, ROLES.Lecturer1_1])
    @Post()
    @ResponseSchema(ThesisDto)
    createThesis(@Body({ required: true }) createRequest: ThesisCreateRequest) {
        return this.thesisService.createThesis(createRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    //@Authorized([ROLES.Admin, ROLES.Lecturer1_1, ROLES.Lecturer1_2, ROLES.Lecturer2])
    @Post('/:id')
    @ResponseSchema(ThesisDto)
    updateThesis(@Param('id') id: number, @Body({ required: true }) updateRequest: ThesisUpdateRequest) {
        return this.thesisService.updateThesis(id, updateRequest);
    }

    //@Authorized(ROLES.Admin)
    @Delete('/:id')
    @OnUndefined(HTTP_CODES.NoContent)
    deleteThesis(@Param('id') id: number) {
        return this.thesisService.deleteThesis(id);
    }
}