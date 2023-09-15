import { inject, injectable } from "inversify";
import { 
    Authorized, 
    Body,
    Get, 
    HttpCode, 
    JsonController,
    Param, 
    Patch,
    QueryParams 
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { RoleServiceInterface } from "../../interfaces";
import { HTTP_CODES } from "../../../core/constants/http-codes";
import { RolesQueryResponse } from "../../../contracts/responses";
import { RolesQueryRequest, RoleUpdateRequest } from "../../../contracts/requests";
import { RoleDto } from "../../../shared/dtos";
import { Role } from "../../../core/constants/roles";

@JsonController('roles')
@Authorized(Role.Admin)
@injectable()
@OpenAPI({
    security: [{ bearerAuth: [] }]
})
export class RoleController {
    constructor(
        @inject(INJECTION_TOKENS.RoleService) private roleService: RoleServiceInterface) {

    }

    @HttpCode(HTTP_CODES.Ok)
    @Get()
    @ResponseSchema(RolesQueryResponse)
    getRoles(@QueryParams() queryRequest: RolesQueryRequest) {
        return this.roleService.getRoles(queryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/lecturer-roles')
    @ResponseSchema(RolesQueryResponse)
    getLecturerRoles() {
        return this.roleService.getLecturerRoles();
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/role/:id')
    @ResponseSchema(RoleDto)
    getRole(@Param('id') id: number) {
        return this.roleService.getRole(id);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Patch('/role/:id')
    @ResponseSchema(RoleDto)
    updateRole(@Param('id') id: number, @Body({ required: true }) updateRequest: RoleUpdateRequest) {
        return this.roleService.updateRole(id, updateRequest);
    }
}