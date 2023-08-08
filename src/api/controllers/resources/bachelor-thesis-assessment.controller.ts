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
import { BachelorThesisAssessmentServiceInterface } from "../../interfaces";
import { HTTP_CODES } from "../../../core/constants/http-codes";
import { BachelorThesisAssessmentsQueryResponse } from "../../../contracts/responses/resources/bachelor-thesis-assessments-query.response";
import { BachelorThesisAssessmentsQueryRequest } from "../../../contracts/requests/resources/bachelor-thesis-assessments-query.request";
import { BachelorThesisAssessmentDto } from "../../../shared/dtos";
import { BachelorThesisAssessmentCreateRequest } from "../../../contracts/requests/resources/bachelor-thesis-assessment-create.request";
import { BachelorThesisAssessmentUpdateRequest } from "../../../contracts/requests/resources/bachelor-thesis-assessment-update.request";
import { ROLES } from "../../../core/constants/roles";
import { AuthorizedUser } from "../../../core/auth-checkers";

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
    @ResponseSchema(BachelorThesisAssessmentsQueryResponse)
    getBachelorThesisAssessments(@CurrentUser() user: AuthorizedUser, 
        @QueryParams() queryRequest: BachelorThesisAssessmentsQueryRequest) {
        return this.bachelorThesisAssessmentService.getBachelorThesisAssessments(user, queryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id')
    @ResponseSchema(BachelorThesisAssessmentDto)
    getBachelorThesisAssessment(@CurrentUser() user: AuthorizedUser, @Param('id') id: number) {
        return this.bachelorThesisAssessmentService.getBachelorThesisAssessment(user, id);
    }

    @HttpCode(HTTP_CODES.Created)
    //@Authorized(ROLES.Admin)
    @Post()
    @ResponseSchema(BachelorThesisAssessmentDto)
    createBachelorThesisAssessment(@CurrentUser() user: AuthorizedUser, 
        @Body({ required: true }) createRequest: BachelorThesisAssessmentCreateRequest) {
        return this.bachelorThesisAssessmentService.createBachelorThesisAssessment(user, createRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    //@Authorized(ROLES.Admin)
    @Post('/:id')
    @ResponseSchema(BachelorThesisAssessmentDto)
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