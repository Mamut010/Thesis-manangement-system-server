import { inject, injectable } from "inversify";
import { 
    Authorized, 
    Body, 
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
import { RoleServiceInterface } from "../../interfaces";
import { HTTP_CODES } from "../../../core/constants/http-codes";
import { RolesQueryResponse } from "../../../contracts/responses/roles-query.response";
import { RolesQueryRequest } from "../../../contracts/requests/roles-query.request";
import { RoleDto } from "../../../shared/dtos";
import { RoleCreateRequest } from "../../../contracts/requests/role-create.request";
import { RoleUpdateRequest } from "../../../contracts/requests/role-update.request";
import { ROLES } from "../../../core/constants/roles";

@JsonController('roles')
//@Authorized()
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
    getRoles(@QueryParams() rolesQuery: RolesQueryRequest) {
        return this.roleService.getRoles(rolesQuery);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id')
    @ResponseSchema(RoleDto)
    getRole(@Param('id') id: number) {
        return this.roleService.getRole(id);
    }

    @HttpCode(HTTP_CODES.Created)
    //@Authorized(ROLES.Admin)
    @Post()
    @ResponseSchema(RoleDto)
    createRole(@Body({ required: true }) createRequest: RoleCreateRequest) {
        return this.roleService.createRole(createRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    //@Authorized(ROLES.Admin)
    @Post('/:id')
    @ResponseSchema(RoleDto)
    updateRole(@Param('id') id: number, @Body({ required: true }) updateRequest: RoleUpdateRequest) {
        return this.roleService.updateRole(id, updateRequest);
    }

    //@Authorized(ROLES.Admin)
    @Delete('/:id')
    @OnUndefined(HTTP_CODES.NoContent)
    deleteRole(@Param('id') id: number) {
        return this.roleService.deleteRole(id);
    }
}