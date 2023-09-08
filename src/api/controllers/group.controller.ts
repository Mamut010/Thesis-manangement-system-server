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
    Patch, 
    Post, 
    QueryParams 
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { GroupServiceInterface } from "../interfaces";
import { HTTP_CODES } from "../../core/constants/http-codes";
import { GroupInfosQueryResponse } from "../../contracts/responses";
import { GroupInfosQueryRequest, GroupInfoCreateRequest, GroupInfoUpdateRequest } from "../../contracts/requests";
import { GroupInfoDto } from "../../shared/dtos";
import { Role } from "../../core/constants/roles";

@JsonController('groups')
//@Authorized()
@injectable()
@OpenAPI({
    security: [{ bearerAuth: [] }]
})
export class GroupController {
    constructor(
        @inject(INJECTION_TOKENS.GroupService) private groupService: GroupServiceInterface) {

    }

    @HttpCode(HTTP_CODES.Ok)
    @Get()
    @ResponseSchema(GroupInfosQueryResponse)
    getGroups(@QueryParams() queryRequest: GroupInfosQueryRequest) {
        return this.groupService.getGroups(queryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id')
    @ResponseSchema(GroupInfoDto)
    getGroup(@Param('id') id: string) {
        return this.groupService.getGroup(id);
    }

    @HttpCode(HTTP_CODES.Created)
    //@Authorized(Role.Admin)
    @Post('/thesis-process')
    @ResponseSchema(GroupInfoDto)
    createThesisProcessGroup(@Body({ required: true }) createRequest: GroupInfoCreateRequest) {
        return this.groupService.createThesisProcessGroup(createRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    //@Authorized(Role.Admin)
    @Patch('/:id')
    @ResponseSchema(GroupInfoDto)
    updateGroup(@Param('id') id: string, @Body({ required: true }) updateRequest: GroupInfoUpdateRequest) {
        return this.groupService.updateGroup(id, updateRequest);
    }

    //@Authorized(Role.Admin)
    @Delete('/:id')
    @OnUndefined(HTTP_CODES.NoContent)
    deleteGroup(@Param('id') id: string) {
        return this.groupService.deleteGroup(id);
    }
}