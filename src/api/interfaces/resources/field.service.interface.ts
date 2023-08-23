import { FieldCreateRequest, FieldUpdateRequest, FieldsQueryRequest } from "../../../contracts/requests";
import { FieldsQueryResponse } from "../../../contracts/responses";
import { FieldDto } from "../../../shared/dtos";

export interface FieldServiceInterface {
    getFields(queryRequest: FieldsQueryRequest) : Promise<FieldsQueryResponse>;
    getField(id: number): Promise<FieldDto>;
    createField(createRequest: FieldCreateRequest): Promise<FieldDto>;
    updateField(id: number, updateRequest: FieldUpdateRequest): Promise<FieldDto>;
    deleteField(id: number): Promise<void>;
}