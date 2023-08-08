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
    Post, 
    QueryParams 
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { OralDefenseAssessmentServiceInterface } from "../../interfaces";
import { HTTP_CODES } from "../../../core/constants/http-codes";
import { OralDefenseAssessmentsQueryResponse } from "../../../contracts/responses/resources/oral-defense-assessments-query.response";
import { OralDefenseAssessmentsQueryRequest } from "../../../contracts/requests/resources/oral-defense-assessments-query.request";
import { OralDefenseAssessmentDto } from "../../../shared/dtos";
import { OralDefenseAssessmentCreateRequest } from "../../../contracts/requests/resources/oral-defense-assessment-create.request";
import { OralDefenseAssessmentUpdateRequest } from "../../../contracts/requests/resources/oral-defense-assessment-update.request";
import { ROLES } from "../../../core/constants/roles";
import { AuthorizedUser } from "../../../core/auth-checkers";

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
    @ResponseSchema(OralDefenseAssessmentsQueryResponse)
    getOralDefenseAssessments(@CurrentUser() user: AuthorizedUser, 
        @QueryParams() queryRequest: OralDefenseAssessmentsQueryRequest) {
        return this.oralDefenseAssessmentService.getOralDefenseAssessments(user, queryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id')
    @ResponseSchema(OralDefenseAssessmentDto)
    getOralDefenseAssessment(@CurrentUser() user: AuthorizedUser, @Param('id') id: number) {
        return this.oralDefenseAssessmentService.getOralDefenseAssessment(user, id);
    }

    @HttpCode(HTTP_CODES.Created)
    //@Authorized(ROLES.Admin)
    @Post()
    @ResponseSchema(OralDefenseAssessmentDto)
    createOralDefenseAssessment(@CurrentUser() user: AuthorizedUser, 
        @Body({ required: true }) createRequest: OralDefenseAssessmentCreateRequest) {
        return this.oralDefenseAssessmentService.createOralDefenseAssessment(user, createRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    //@Authorized(ROLES.Admin)
    @Post('/:id')
    @ResponseSchema(OralDefenseAssessmentDto)
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