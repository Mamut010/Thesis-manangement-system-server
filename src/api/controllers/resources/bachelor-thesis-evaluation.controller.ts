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
import { BachelorThesisEvaluationServiceInterface } from "../../interfaces";
import { HTTP_CODES } from "../../../core/constants/http-codes";
import { BachelorThesisEvaluationsQueryResponse } from "../../../contracts/responses/resources/bachelor-thesis-evaluations-query.response";
import { BachelorThesisEvaluationsQueryRequest } from "../../../contracts/requests/resources/bachelor-thesis-evaluations-query.request";
import { BachelorThesisEvaluationDto } from "../../../shared/dtos";
import { BachelorThesisEvaluationCreateRequest } from "../../../contracts/requests/resources/bachelor-thesis-evaluation-create.request";
import { BachelorThesisEvaluationUpdateRequest } from "../../../contracts/requests/resources/bachelor-thesis-evaluation-update.request";
import { ROLES } from "../../../core/constants/roles";
import { AuthorizedUser } from "../../../core/auth-checkers";

@JsonController('bachelor-thesis-evaluations')
//@Authorized()
@injectable()
@OpenAPI({
    security: [{ bearerAuth: [] }]
})
export class BachelorThesisEvaluationController {
    constructor(
        @inject(INJECTION_TOKENS.BachelorThesisEvaluationService) 
        private bachelorThesisEvaluationService: BachelorThesisEvaluationServiceInterface) {

    }

    @HttpCode(HTTP_CODES.Ok)
    @Get()
    @ResponseSchema(BachelorThesisEvaluationsQueryResponse)
    getBachelorThesisEvaluations(@CurrentUser() user: AuthorizedUser, 
        @QueryParams() queryRequest: BachelorThesisEvaluationsQueryRequest) {
        return this.bachelorThesisEvaluationService.getBachelorThesisEvaluations(user, queryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id')
    @ResponseSchema(BachelorThesisEvaluationDto)
    getBachelorThesisEvaluation(@CurrentUser() user: AuthorizedUser, @Param('id') id: number) {
        return this.bachelorThesisEvaluationService.getBachelorThesisEvaluation(user, id);
    }

    @HttpCode(HTTP_CODES.Created)
    //@Authorized([ROLES.Admin, ROLES.Lecturer1_1, ROLES.Lecturer1_2])
    @Post()
    @ResponseSchema(BachelorThesisEvaluationDto)
    createBachelorThesisEvaluation(@CurrentUser() user: AuthorizedUser, 
        @Body({ required: true }) createRequest: BachelorThesisEvaluationCreateRequest) {
        return this.bachelorThesisEvaluationService.createBachelorThesisEvaluation(user, createRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    //@Authorized([ROLES.Admin, ROLES.Lecturer1_1, ROLES.Lecturer1_2])
    @Post('/:id')
    @ResponseSchema(BachelorThesisEvaluationDto)
    updateBachelorThesisEvaluation(@CurrentUser() user: AuthorizedUser, @Param('id') id: number, 
        @Body({ required: true }) updateRequest: BachelorThesisEvaluationUpdateRequest) {
        return this.bachelorThesisEvaluationService.updateBachelorThesisEvaluation(user, id, updateRequest);
    }

    //@Authorized([ROLES.Admin, ROLES.Lecturer1_1, ROLES.Lecturer1_2])
    @Delete('/:id')
    @OnUndefined(HTTP_CODES.NoContent)
    deleteBachelorThesisEvaluation(@CurrentUser() user: AuthorizedUser, @Param('id') id: number) {
        return this.bachelorThesisEvaluationService.deleteBachelorThesisEvaluation(user, id);
    }
}