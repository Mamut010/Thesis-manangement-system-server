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
    Param, 
    Patch, 
    Post, 
    QueryParams 
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { OralDefenseAssessmentServiceInterface } from "../../interfaces";
import { HTTP_CODES } from "../../../core/constants/http-codes";
import { OralDefenseAssessmentsQueryRequest } from "../../../contracts/requests/resources/oral-defense-assessments-query.request";
import { OralDefenseAssessmentInfoDto } from "../../../shared/dtos";
import { OralDefenseAssessmentCreateRequest } from "../../../contracts/requests/resources/oral-defense-assessment-create.request";
import { OralDefenseAssessmentUpdateRequest } from "../../../contracts/requests/resources/oral-defense-assessment-update.request";
import { ROLES } from "../../../core/constants/roles";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { OralDefenseAssessmentInfosQueryResponse } from "../../../contracts/responses/api/oral-defense-assessment-infos-query.response";

@JsonController('oral-defense-assessments')
//@Authorized()
@injectable()
@OpenAPI({
    security: [{ bearerAuth: [] }]
})
export class OralDefenseAssessmentController {
    constructor(
        @inject(INJECTION_TOKENS.OralDefenseAssessmentService) 
        private oralDefenseAssessmentService: OralDefenseAssessmentServiceInterface) {

    }

    @HttpCode(HTTP_CODES.Ok)
    @Get()
    @ResponseSchema(OralDefenseAssessmentInfosQueryResponse)
    getOralDefenseAssessments(@CurrentUser() user: AuthorizedUser, 
        @QueryParams() queryRequest: OralDefenseAssessmentsQueryRequest) {
        return this.oralDefenseAssessmentService.getOralDefenseAssessments(user, queryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id')
    @ResponseSchema(OralDefenseAssessmentInfoDto)
    getOralDefenseAssessment(@CurrentUser() user: AuthorizedUser, @Param('id') id: number) {
        return this.oralDefenseAssessmentService.getOralDefenseAssessment(user, id);
    }

    @HttpCode(HTTP_CODES.Created)
    //@Authorized(ROLES.Admin)
    @Post()
    @ResponseSchema(OralDefenseAssessmentInfoDto)
    createOralDefenseAssessment(@CurrentUser() user: AuthorizedUser, 
        @Body({ required: true }) createRequest: OralDefenseAssessmentCreateRequest) {
        return this.oralDefenseAssessmentService.createOralDefenseAssessment(user, createRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    //@Authorized(ROLES.Admin)
    @Patch('/:id')
    @ResponseSchema(OralDefenseAssessmentInfoDto)
    updateOralDefenseAssessment(@CurrentUser() user: AuthorizedUser, @Param('id') id: number, 
        @Body({ required: true }) updateRequest: OralDefenseAssessmentUpdateRequest) {
        return this.oralDefenseAssessmentService.updateOralDefenseAssessment(user, id, updateRequest);
    }

    //@Authorized([ROLES.Admin, ROLES.Student])
    @Delete('/:id')
    @OnUndefined(HTTP_CODES.NoContent)
    deleteOralDefenseAssessment(@CurrentUser() user: AuthorizedUser, @Param('id') id: number) {
        return this.oralDefenseAssessmentService.deleteOralDefenseAssessment(user, id);
    }
}