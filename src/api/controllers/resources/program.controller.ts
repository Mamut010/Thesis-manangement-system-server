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
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { ProgramServiceInterface } from "../../interfaces";
import { HTTP_CODES } from "../../../core/constants/http-codes";
import { ProgramsQueryResponse } from "../../../contracts/responses";
import { ProgramsQueryRequest, ProgramCreateRequest, ProgramUpdateRequest } from "../../../contracts/requests";
import { ProgramDto } from "../../../shared/dtos";
import { Role } from "../../../core/constants/roles";

@JsonController('programs')
//@Authorized()
@injectable()
@OpenAPI({
    security: [{ bearerAuth: [] }]
})
export class ProgramController {
    constructor(
        @inject(INJECTION_TOKENS.ProgramService) private programService: ProgramServiceInterface) {

    }

    @HttpCode(HTTP_CODES.Ok)
    @Get()
    @ResponseSchema(ProgramsQueryResponse)
    getPrograms(@QueryParams() queryRequest: ProgramsQueryRequest) {
        return this.programService.getPrograms(queryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id')
    @ResponseSchema(ProgramDto)
    getProgram(@Param('id') id: number) {
        return this.programService.getProgram(id);
    }

    @HttpCode(HTTP_CODES.Created)
    //@Authorized(Role.Admin)
    @Post()
    @ResponseSchema(ProgramDto)
    createProgram(@Body({ required: true }) createRequest: ProgramCreateRequest) {
        return this.programService.createProgram(createRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    //@Authorized(Role.Admin)
    @Patch('/:id')
    @ResponseSchema(ProgramDto)
    updateProgram(@Param('id') id: number, @Body({ required: true }) updateRequest: ProgramUpdateRequest) {
        return this.programService.updateProgram(id, updateRequest);
    }

    //@Authorized(Role.Admin)
    @Delete('/:id')
    @OnUndefined(HTTP_CODES.NoContent)
    deleteProgram(@Param('id') id: number) {
        return this.programService.deleteProgram(id);
    }
}