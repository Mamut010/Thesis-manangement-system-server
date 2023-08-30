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
import { OralDefenseRegistrationServiceInterface } from "../../interfaces";
import { HTTP_CODES } from "../../../core/constants/http-codes";
import { 
    OralDefenseRegistrationsQueryRequest,
    OralDefenseRegistrationCreateRequest,
    OralDefenseRegistrationUpdateRequest
} from "../../../contracts/requests";
import { OralDefenseRegistrationInfoDto } from "../../../shared/dtos";
import { Role } from "../../../core/constants/roles";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { OralDefenseRegistrationInfosQueryResponse } from "../../../contracts/responses";

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
    @ResponseSchema(OralDefenseRegistrationInfosQueryResponse)
    getOralDefenseRegistrations(@CurrentUser() user: AuthorizedUser, 
        @QueryParams() queryRequest: OralDefenseRegistrationsQueryRequest) {
        return this.oralDefenseRegistrationService.getOralDefenseRegistrations(user, queryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id')
    @ResponseSchema(OralDefenseRegistrationInfoDto)
    getOralDefenseRegistration(@CurrentUser() user: AuthorizedUser, @Param('id') id: number) {
        return this.oralDefenseRegistrationService.getOralDefenseRegistration(user, id);
    }

    @HttpCode(HTTP_CODES.Created)
    //@Authorized(Role.Admin)
    @Post()
    @ResponseSchema(OralDefenseRegistrationInfoDto)
    createOralDefenseRegistration(@CurrentUser() user: AuthorizedUser, 
        @Body({ required: true }) createRequest: OralDefenseRegistrationCreateRequest) {
        return this.oralDefenseRegistrationService.createOralDefenseRegistration(user, createRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    //@Authorized(Role.Admin)
    @Patch('/:id')
    @ResponseSchema(OralDefenseRegistrationInfoDto)
    updateOralDefenseRegistration(@CurrentUser() user: AuthorizedUser, @Param('id') id: number, 
        @Body({ required: true }) updateRequest: OralDefenseRegistrationUpdateRequest) {
        return this.oralDefenseRegistrationService.updateOralDefenseRegistration(user, id, updateRequest);
    }

    //@Authorized([Role.Admin, Role.Student])
    @Delete('/:id')
    @OnUndefined(HTTP_CODES.NoContent)
    deleteOralDefenseRegistration(@CurrentUser() user: AuthorizedUser, @Param('id') id: number) {
        return this.oralDefenseRegistrationService.deleteOralDefenseRegistration(user, id);
    }
}