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
import { OralDefenseAssessmentServiceInterface } from "../../interfaces";
import { HTTP_CODES } from "../../../core/constants/http-codes";
import { 
    OralDefenseAssessmentInfosQueryRequest, 
    OralDefenseAssessmentInfoUpdateRequest 
} from "../../../contracts/requests";
import { OralDefenseAssessmentInfoDto } from "../../../shared/dtos";
import { LecturerRoles } from "../../../core/constants/roles";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { OralDefenseAssessmentInfosQueryResponse } from "../../../contracts/responses";

@JsonController('oral-defense-assessments')
@Authorized()
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
        @QueryParams() queryRequest: OralDefenseAssessmentInfosQueryRequest) {
        return this.oralDefenseAssessmentService.getOralDefenseAssessments(user, queryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id')
    @ResponseSchema(OralDefenseAssessmentInfoDto)
    getOralDefenseAssessment(@CurrentUser() user: AuthorizedUser, @Param('id') id: number) {
        return this.oralDefenseAssessmentService.getOralDefenseAssessment(user, id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Authorized(LecturerRoles)
    @Patch('/:id')
    @ResponseSchema(OralDefenseAssessmentInfoDto)
    updateOralDefenseAssessment(@CurrentUser() user: AuthorizedUser, @Param('id') id: number, 
        @Body({ required: true }) updateRequest: OralDefenseAssessmentInfoUpdateRequest) {
        return this.oralDefenseAssessmentService.updateOralDefenseAssessment(user, id, updateRequest);
    }

    @Authorized(LecturerRoles)
    @Delete('/:id')
    @OnUndefined(HTTP_CODES.NoContent)
    deleteOralDefenseAssessment(@CurrentUser() user: AuthorizedUser, @Param('id') id: number) {
        return this.oralDefenseAssessmentService.deleteOralDefenseAssessment(user, id);
    }
}