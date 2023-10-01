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
    QueryParams 
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { BachelorThesisAssessmentServiceInterface } from "../../interfaces";
import { HTTP_CODES } from "../../../core/constants/http-codes";
import { 
    BachelorThesisAssessmentInfosQueryRequest,
    BachelorThesisAssessmentInfoUpdateRequest
} from "../../../contracts/requests";
import { BachelorThesisAssessmentInfoDto } from "../../../shared/dtos";
import { Role } from "../../../core/constants/roles";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { BachelorThesisAssessmentInfosQueryResponse } from "../../../contracts/responses";

@JsonController('bachelor-thesis-assessments')
@Authorized()
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
        @QueryParams() queryRequest: BachelorThesisAssessmentInfosQueryRequest) {
        return this.bachelorThesisAssessmentService.getBachelorThesisAssessments(user, queryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id')
    @ResponseSchema(BachelorThesisAssessmentInfoDto)
    getBachelorThesisAssessment(@CurrentUser() user: AuthorizedUser, @Param('id') id: number) {
        return this.bachelorThesisAssessmentService.getBachelorThesisAssessment(user, id);
    }

    @HttpCode(HTTP_CODES.Ok)
    //@Authorized(Role.Admin)
    @Patch('/:id')
    @ResponseSchema(BachelorThesisAssessmentInfoDto)
    updateBachelorThesisAssessment(@CurrentUser() user: AuthorizedUser, @Param('id') id: number, 
        @Body({ required: true }) updateRequest: BachelorThesisAssessmentInfoUpdateRequest) {
        return this.bachelorThesisAssessmentService.updateBachelorThesisAssessment(user, id, updateRequest);
    }

    //@Authorized([Role.Admin, Role.Student])
    @Delete('/:id')
    @OnUndefined(HTTP_CODES.NoContent)
    deleteBachelorThesisAssessment(@CurrentUser() user: AuthorizedUser, @Param('id') id: number) {
        return this.bachelorThesisAssessmentService.deleteBachelorThesisAssessment(user, id);
    }
}