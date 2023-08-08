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
import { BachelorThesisRegistrationServiceInterface } from "../../interfaces";
import { HTTP_CODES } from "../../../core/constants/http-codes";
import { BachelorThesisRegistrationsQueryResponse } from "../../../contracts/responses/resources/bachelor-thesis-registrations-query.response";
import { BachelorThesisRegistrationsQueryRequest } from "../../../contracts/requests/resources/bachelor-thesis-registrations-query.request";
import { BachelorThesisRegistrationDto } from "../../../shared/dtos";
import { BachelorThesisRegistrationCreateRequest } from "../../../contracts/requests/resources/bachelor-thesis-registration-create.request";
import { BachelorThesisRegistrationUpdateRequest } from "../../../contracts/requests/resources/bachelor-thesis-registration-update.request";
import { ROLES } from "../../../core/constants/roles";
import { AuthorizedUser } from "../../../core/auth-checkers";

@JsonController('bachelor-thesis-registrations')
//@Authorized()
@injectable()
@OpenAPI({
    security: [{ bearerAuth: [] }]
})
export class BachelorThesisRegistrationController {
    constructor(
        @inject(INJECTION_TOKENS.BachelorThesisRegistrationService) 
        private bachelorThesisRegistrationService: BachelorThesisRegistrationServiceInterface) {

    }

    @HttpCode(HTTP_CODES.Ok)
    @Get()
    @ResponseSchema(BachelorThesisRegistrationsQueryResponse)
    getBachelorThesisRegistrations(@CurrentUser() user: AuthorizedUser, 
        @QueryParams() queryRequest: BachelorThesisRegistrationsQueryRequest) {
        return this.bachelorThesisRegistrationService.getBachelorThesisRegistrations(user, queryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id')
    @ResponseSchema(BachelorThesisRegistrationDto)
    getBachelorThesisRegistration(@CurrentUser() user: AuthorizedUser, @Param('id') id: number) {
        return this.bachelorThesisRegistrationService.getBachelorThesisRegistration(user, id);
    }

    @HttpCode(HTTP_CODES.Created)
    //@Authorized(ROLES.Admin)
    @Post()
    @ResponseSchema(BachelorThesisRegistrationDto)
    createBachelorThesisRegistration(@CurrentUser() user: AuthorizedUser, 
        @Body({ required: true }) createRequest: BachelorThesisRegistrationCreateRequest) {
        return this.bachelorThesisRegistrationService.createBachelorThesisRegistration(user, createRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    //@Authorized(ROLES.Admin)
    @Post('/:id')
    @ResponseSchema(BachelorThesisRegistrationDto)
    updateBachelorThesisRegistration(@CurrentUser() user: AuthorizedUser, @Param('id') id: number, 
        @Body({ required: true }) updateRequest: BachelorThesisRegistrationUpdateRequest) {
        return this.bachelorThesisRegistrationService.updateBachelorThesisRegistration(user, id, updateRequest);
    }

    //@Authorized([ROLES.Admin, ROLES.Student])
    @Delete('/:id')
    @OnUndefined(HTTP_CODES.NoContent)
    deleteBachelorThesisRegistration(@CurrentUser() user: AuthorizedUser, @Param('id') id: number) {
        return this.bachelorThesisRegistrationService.deleteBachelorThesisRegistration(user, id);
    }
}