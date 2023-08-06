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
import { FieldServiceInterface } from "../../interfaces";
import { HTTP_CODES } from "../../../core/constants/http-codes";
import { FieldsQueryResponse } from "../../../contracts/responses/resources/fields-query.response";
import { FieldsQueryRequest } from "../../../contracts/requests/resources/fields-query.request";
import { FieldDto } from "../../../shared/dtos";
import { FieldCreateRequest } from "../../../contracts/requests/resources/field-create.request";
import { FieldUpdateRequest } from "../../../contracts/requests/resources/field-update.request";
import { ROLES } from "../../../core/constants/roles";

@JsonController('fields')
//@Authorized()
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
    getFields(@QueryParams() fieldsQuery: FieldsQueryRequest) {
        return this.fieldService.getFields(fieldsQuery);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id')
    @ResponseSchema(FieldDto)
    getField(@Param('id') id: number) {
        return this.fieldService.getField(id);
    }

    @HttpCode(HTTP_CODES.Created)
    //@Authorized(ROLES.Admin)
    @Post()
    @ResponseSchema(FieldDto)
    createField(@Body({ required: true }) createRequest: FieldCreateRequest) {
        return this.fieldService.createField(createRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    //@Authorized(ROLES.Admin)
    @Post('/:id')
    @ResponseSchema(FieldDto)
    updateField(@Param('id') id: number, @Body({ required: true }) updateRequest: FieldUpdateRequest) {
        return this.fieldService.updateField(id, updateRequest);
    }

    //@Authorized(ROLES.Admin)
    @Delete('/:id')
    @OnUndefined(HTTP_CODES.NoContent)
    deleteField(@Param('id') id: number) {
        return this.fieldService.deleteField(id);
    }
}