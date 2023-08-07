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
import { OralDefenseRegistrationServiceInterface } from "../../interfaces";
import { HTTP_CODES } from "../../../core/constants/http-codes";
import { OralDefenseRegistrationsQueryResponse } from "../../../contracts/responses/resources/oral-defense-registrations-query.response";
import { OralDefenseRegistrationsQueryRequest } from "../../../contracts/requests/resources/oral-defense-registrations-query.request";
import { OralDefenseRegistrationDto } from "../../../shared/dtos";
import { OralDefenseRegistrationCreateRequest } from "../../../contracts/requests/resources/oral-defense-registration-create.request";
import { OralDefenseRegistrationUpdateRequest } from "../../../contracts/requests/resources/oral-defense-registration-update.request";
import { ROLES } from "../../../core/constants/roles";
import { AuthorizedUser } from "../../../core/auth-checkers";

@JsonController('oral-defense-registrations')
//@Authorized()
@injectable()
@OpenAPI({
    security: [{ bearerAuth: [] }]
})
export class OralDefenseRegistrationController {
    constructor(
        @inject(INJECTION_TOKENS.OralDefenseRegistrationService) 
        private oralDefenseRegistrationService: OralDefenseRegistrationServiceInterface) {

    }

    @HttpCode(HTTP_CODES.Ok)
    @Get()
    @ResponseSchema(OralDefenseRegistrationsQueryResponse)
    getOralDefenseRegistrations(@CurrentUser() user: AuthorizedUser, 
        @QueryParams() oralDefenseRegistrationsQuery: OralDefenseRegistrationsQueryRequest) {
        return this.oralDefenseRegistrationService.getOralDefenseRegistrations(user, oralDefenseRegistrationsQuery);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id')
    @ResponseSchema(OralDefenseRegistrationDto)
    getOralDefenseRegistration(@CurrentUser() user: AuthorizedUser, @Param('id') id: number) {
        return this.oralDefenseRegistrationService.getOralDefenseRegistration(user, id);
    }

    @HttpCode(HTTP_CODES.Created)
    //@Authorized(ROLES.Admin)
    @Post()
    @ResponseSchema(OralDefenseRegistrationDto)
    createOralDefenseRegistration(@CurrentUser() user: AuthorizedUser, 
        @Body({ required: true }) createRequest: OralDefenseRegistrationCreateRequest) {
        return this.oralDefenseRegistrationService.createOralDefenseRegistration(user, createRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    //@Authorized(ROLES.Admin)
    @Post('/:id')
    @ResponseSchema(OralDefenseRegistrationDto)
    updateOralDefenseRegistration(@CurrentUser() user: AuthorizedUser, @Param('id') id: number, 
        @Body({ required: true }) updateRequest: OralDefenseRegistrationUpdateRequest) {
        return this.oralDefenseRegistrationService.updateOralDefenseRegistration(user, id, updateRequest);
    }

    //@Authorized([ROLES.Admin, ROLES.Student])
    @Delete('/:id')
    @OnUndefined(HTTP_CODES.NoContent)
    deleteOralDefenseRegistration(@CurrentUser() user: AuthorizedUser, @Param('id') id: number) {
        return this.oralDefenseRegistrationService.deleteOralDefenseRegistration(user, id);
    }
}