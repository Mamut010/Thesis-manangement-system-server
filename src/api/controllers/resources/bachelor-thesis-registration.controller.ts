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
import { BachelorThesisRegistrationServiceInterface } from "../../interfaces";
import { HTTP_CODES } from "../../../core/constants/http-codes";
import { 
    BachelorThesisRegistrationsQueryRequest,
    BachelorThesisRegistrationCreateRequest,
    BachelorThesisRegistrationUpdateRequest
} from "../../../contracts/requests";
import { BachelorThesisRegistrationInfoDto } from "../../../shared/dtos";
import { ROLES } from "../../../core/constants/roles";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { BachelorThesisRegistrationInfosQueryResponse } from "../../../contracts/responses";

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
    @ResponseSchema(BachelorThesisRegistrationInfosQueryResponse)
    getBachelorThesisRegistrations(@CurrentUser() user: AuthorizedUser, 
        @QueryParams() queryRequest: BachelorThesisRegistrationsQueryRequest) {
        return this.bachelorThesisRegistrationService.getBachelorThesisRegistrations(user, queryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id')
    @ResponseSchema(BachelorThesisRegistrationInfoDto)
    getBachelorThesisRegistration(@CurrentUser() user: AuthorizedUser, @Param('id') id: number) {
        return this.bachelorThesisRegistrationService.getBachelorThesisRegistration(user, id);
    }

    @HttpCode(HTTP_CODES.Created)
    //@Authorized(ROLES.Admin)
    @Post()
    @ResponseSchema(BachelorThesisRegistrationInfoDto)
    createBachelorThesisRegistration(@CurrentUser() user: AuthorizedUser, 
        @Body({ required: true }) createRequest: BachelorThesisRegistrationCreateRequest) {
        return this.bachelorThesisRegistrationService.createBachelorThesisRegistration(user, createRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    //@Authorized(ROLES.Admin)
    @Patch('/:id')
    @ResponseSchema(BachelorThesisRegistrationInfoDto)
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