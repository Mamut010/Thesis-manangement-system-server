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
    QueryParams
} from "routing-controllers";
import { Role } from "../../../core/constants/roles";
import { inject, injectable } from "inversify";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { ThesisServiceInterface } from "../../interfaces";
import { HTTP_CODES } from "../../../core/constants/http-codes";
import { ThesisInfoDto } from "../../../shared/dtos";
import { ThesisInfosQueryResponse } from "../../../contracts/responses";
import { ThesisInfosQueryRequest, ThesisInfoCreateRequest, ThesisInfoUpdateRequest } from "../../../contracts/requests";
import { AuthorizedUser } from "../../../core/auth-checkers";

@JsonController('theses')
@Authorized()
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
    @ResponseSchema(ThesisInfosQueryResponse)
    getTheses(@QueryParams() queryRequest: ThesisInfosQueryRequest) {
        return this.thesisService.getTheses(queryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id')
    @ResponseSchema(ThesisInfoDto)
    getThesis(@Param('id') id: number) {
        return this.thesisService.getThesis(id);
    }

    @HttpCode(HTTP_CODES.Created)
    @Authorized([Role.Admin, Role.Lecturer1_1])
    @Post()
    @ResponseSchema(ThesisInfoDto)
    createThesis(@CurrentUser() user: AuthorizedUser, @Body({ required: true }) createRequest: ThesisInfoCreateRequest) {
        return this.thesisService.createThesis(user, createRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Authorized([Role.Admin, Role.Lecturer1_1])
    @Patch('/:id')
    @ResponseSchema(ThesisInfoDto)
    updateThesis(@CurrentUser() user: AuthorizedUser, @Param('id') id: number, 
        @Body({ required: true }) updateRequest: ThesisInfoUpdateRequest) {
        return this.thesisService.updateThesis(user, id, updateRequest);
    }

    @Authorized([Role.Admin, Role.Lecturer1_1])
    @Delete('/:id')
    @OnUndefined(HTTP_CODES.NoContent)
    deleteThesis(@CurrentUser() user: AuthorizedUser, @Param('id') id: number) {
        return this.thesisService.deleteThesis(user, id);
    }
}