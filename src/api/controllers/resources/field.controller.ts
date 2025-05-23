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
import { FieldServiceInterface } from "../../interfaces";
import { HTTP_CODES } from "../../../core/constants/http-codes";
import { FieldsQueryResponse } from "../../../contracts/responses";
import { FieldsQueryRequest, FieldCreateRequest, FieldUpdateRequest } from "../../../contracts/requests";
import { FieldDto } from "../../../shared/dtos";
import { Role } from "../../../core/constants/roles";

@JsonController('fields')
@Authorized()
@injectable()
@OpenAPI({
    security: [{ bearerAuth: [] }]
})
export class FieldController {
    constructor(
        @inject(INJECTION_TOKENS.FieldService) private fieldService: FieldServiceInterface) {

    }

    @HttpCode(HTTP_CODES.Ok)
    @Get()
    @ResponseSchema(FieldsQueryResponse)
    getFields(@QueryParams() queryRequest: FieldsQueryRequest) {
        return this.fieldService.getFields(queryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id')
    @ResponseSchema(FieldDto)
    getField(@Param('id') id: number) {
        return this.fieldService.getField(id);
    }

    @HttpCode(HTTP_CODES.Created)
    @Authorized([Role.Admin, Role.Lecturer1_1])
    @Post()
    @ResponseSchema(FieldDto)
    createField(@Body({ required: true }) createRequest: FieldCreateRequest) {
        return this.fieldService.createField(createRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Authorized([Role.Admin, Role.Lecturer1_1])
    @Patch('/:id')
    @ResponseSchema(FieldDto)
    updateField(@Param('id') id: number, @Body({ required: true }) updateRequest: FieldUpdateRequest) {
        return this.fieldService.updateField(id, updateRequest);
    }

    @Authorized([Role.Admin, Role.Lecturer1_1])
    @Delete('/:id')
    @OnUndefined(HTTP_CODES.NoContent)
    deleteField(@Param('id') id: number) {
        return this.fieldService.deleteField(id);
    }
}