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
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { HTTP_CODES } from "../../core/constants/http-codes";
import { RequestAssociatedDataResponse, RequestInfosQueryResponse } from "../../contracts/responses";
import { AuthorizedUser } from "../../core/auth-checkers";
import { RequestInfosQueryRequest } from "../../contracts/requests";
import { RequestServiceInterface } from "../interfaces";
import { RequestStateInfoDto } from "../../shared/dtos";
import { RequestActionSubmitRequest } from "../../contracts/requests/api/request-action-submit.request";

@JsonController('requests')
@Authorized()
@injectable()
@OpenAPI({
    security: [{ bearerAuth: [] }]
})
export class RequestController {
    constructor(@inject(INJECTION_TOKENS.RequestService) private requestService: RequestServiceInterface) {

    }

    @HttpCode(HTTP_CODES.Ok)
    @Get()
    @ResponseSchema(RequestInfosQueryResponse)
    getRequests(@CurrentUser() user: AuthorizedUser, @QueryParams() queryRequest: RequestInfosQueryRequest) {
        return this.requestService.getRequests(user, queryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id')
    @ResponseSchema(RequestStateInfoDto)
    getRequestState(@CurrentUser() user: AuthorizedUser, @Param('id') id: string) {
        return this.requestService.getRequestState(user, id);
    }

    @Delete('/:id')
    @OnUndefined(HTTP_CODES.NoContent)
    deleteRequest(@CurrentUser() user: AuthorizedUser, @Param('id') id: string) {
        return this.requestService.deleteRequest(user, id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Post('/submit-action')
    @ResponseSchema(RequestStateInfoDto)
    @OnUndefined(HTTP_CODES.NotFound)
    submitAction(@CurrentUser() user: AuthorizedUser, 
        @Body({ required: true }) actionSubmitRequest: RequestActionSubmitRequest) {
        return this.requestService.submitAction(user, actionSubmitRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id/associated-data')
    @ResponseSchema(RequestAssociatedDataResponse)
    getRequestAssociatedData(@CurrentUser() user: AuthorizedUser, @Param('id') id: string) {
        return this.requestService.getRequestAssociatedData(user, id);
    }
}