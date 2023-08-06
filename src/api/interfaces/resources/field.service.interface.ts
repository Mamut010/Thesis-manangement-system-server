import { FieldCreateRequest } from "../../../contracts/requests/resources/field-create.request";
import { FieldUpdateRequest } from "../../../contracts/requests/resources/field-update.request";
import { FieldsQueryRequest } from "../../../contracts/requests/resources/fields-query.request";
import { FieldsQueryResponse } from "../../../contracts/responses/resources/fields-query.response";
import { FieldDto } from "../../../shared/dtos";

export interface FieldServiceInterface {
    getFields(queryRequest: FieldsQueryRequest) : Promise<FieldsQueryResponse>;
    getField(id: number): Promise<FieldDto>;
    createField(createRequest: FieldCreateRequest): Promise<FieldDto>;
    updateField(id: number, updateRequest: FieldUpdateRequest): Promise<FieldDto>;
    deleteField(id: number): Promise<void>;
}