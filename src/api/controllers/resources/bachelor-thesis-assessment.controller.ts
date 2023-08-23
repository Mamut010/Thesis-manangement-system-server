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
import { BachelorThesisAssessmentServiceInterface } from "../../interfaces";
import { HTTP_CODES } from "../../../core/constants/http-codes";
import { BachelorThesisAssessmentsQueryRequest } from "../../../contracts/requests/resources/bachelor-thesis-assessments-query.request";
import { BachelorThesisAssessmentInfoDto } from "../../../shared/dtos";
import { BachelorThesisAssessmentCreateRequest } from "../../../contracts/requests/resources/bachelor-thesis-assessment-create.request";
import { BachelorThesisAssessmentUpdateRequest } from "../../../contracts/requests/resources/bachelor-thesis-assessment-update.request";
import { ROLES } from "../../../core/constants/roles";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { BachelorThesisAssessmentInfosQueryResponse } from "../../../contracts/responses/api/bachelor-thesis-assessment-infos-query.response";

@JsonController('bachelor-thesis-assessments')
//@Authorized()
@injectable()
@OpenAPI({
    security: [{ bearerAuth: [] }]
})
export class BachelorThesisAssessmentController {
    constructor(
        @inject(INJECTION_TOKENS.BachelorThesisAssessmentService) 
        private bachelorThesisAssessmentService: BachelorThesisAssessmentServiceInterface) {

    }

    @HttpCode(HTTP_CODES.Ok)
    @Get()
    @ResponseSchema(BachelorThesisAssessmentInfosQueryResponse)
    getBachelorThesisAssessments(@CurrentUser() user: AuthorizedUser, 
        @QueryParams() queryRequest: BachelorThesisAssessmentsQueryRequest) {
        return this.bachelorThesisAssessmentService.getBachelorThesisAssessments(user, queryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id')
    @ResponseSchema(BachelorThesisAssessmentInfoDto)
    getBachelorThesisAssessment(@CurrentUser() user: AuthorizedUser, @Param('id') id: number) {
        return this.bachelorThesisAssessmentService.getBachelorThesisAssessment(user, id);
    }

    @HttpCode(HTTP_CODES.Created)
    //@Authorized(ROLES.Admin)
    @Post()
    @ResponseSchema(BachelorThesisAssessmentInfoDto)
    createBachelorThesisAssessment(@CurrentUser() user: AuthorizedUser, 
        @Body({ required: true }) createRequest: BachelorThesisAssessmentCreateRequest) {
        return this.bachelorThesisAssessmentService.createBachelorThesisAssessment(user, createRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    //@Authorized(ROLES.Admin)
    @Patch('/:id')
    @ResponseSchema(BachelorThesisAssessmentInfoDto)
    updateBachelorThesisAssessment(@CurrentUser() user: AuthorizedUser, @Param('id') id: number, 
        @Body({ required: true }) updateRequest: BachelorThesisAssessmentUpdateRequest) {
        return this.bachelorThesisAssessmentService.updateBachelorThesisAssessment(user, id, updateRequest);
    }

    //@Authorized([ROLES.Admin, ROLES.Student])
    @Delete('/:id')
    @OnUndefined(HTTP_CODES.NoContent)
    deleteBachelorThesisAssessment(@CurrentUser() user: AuthorizedUser, @Param('id') id: number) {
        return this.bachelorThesisAssessmentService.deleteBachelorThesisAssessment(user, id);
    }
}