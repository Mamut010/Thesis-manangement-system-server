import { inject, injectable } from "inversify";
import { 
    Authorized,
    CurrentUser, 
    Delete, 
    Get, 
    HttpCode, 
    JsonController, 
    OnUndefined, 
    Param,
    QueryParams 
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { BachelorThesisEvaluationServiceInterface } from "../../interfaces";
import { HTTP_CODES } from "../../../core/constants/http-codes";
import { 
    BachelorThesisEvaluationInfosQueryRequest,
} from "../../../contracts/requests";
import { BachelorThesisEvaluationInfoDto } from "../../../shared/dtos";
import { Role } from "../../../core/constants/roles";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { BachelorThesisEvaluationInfosQueryResponse } from "../../../contracts/responses";

@JsonController('bachelor-thesis-evaluations')
@Authorized()
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
    @ResponseSchema(BachelorThesisEvaluationInfosQueryResponse)
    getBachelorThesisEvaluations(@CurrentUser() user: AuthorizedUser, 
        @QueryParams() queryRequest: BachelorThesisEvaluationInfosQueryRequest) {
        return this.bachelorThesisEvaluationService.getBachelorThesisEvaluations(user, queryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id')
    @ResponseSchema(BachelorThesisEvaluationInfoDto)
    getBachelorThesisEvaluation(@CurrentUser() user: AuthorizedUser, @Param('id') id: number) {
        return this.bachelorThesisEvaluationService.getBachelorThesisEvaluation(user, id);
    }

    @Delete('/:id')
    @Authorized(Role.Admin)
    @OnUndefined(HTTP_CODES.NoContent)
    deleteBachelorThesisEvaluation(@CurrentUser() user: AuthorizedUser, @Param('id') id: number) {
        return this.bachelorThesisEvaluationService.deleteBachelorThesisEvaluation(user, id);
    }
}