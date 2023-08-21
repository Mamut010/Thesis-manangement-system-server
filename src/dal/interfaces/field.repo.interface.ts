import { FieldCreateRequest } from "../../contracts/requests/resources/field-create.request";
import { FieldUpdateRequest } from "../../contracts/requests/resources/field-update.request";
import { FieldsQueryRequest } from "../../contracts/requests/resources/fields-query.request";
import { FieldsQueryResponse } from "../../contracts/responses/resources/fields-query.response";
import { FieldDto } from "../../shared/dtos";

export interface FieldRepoInterface {
    query(queryRequest: FieldsQueryRequest): Promise<FieldsQueryResponse>;

    findOneById(id: number): Promise<FieldDto | null>;

    create(createRequest: FieldCreateRequest): Promise<FieldDto>;

    update(id: number, updateRequest: FieldUpdateRequest): Promise<FieldDto | null>;

    delete(id: number): Promise<boolean>;
}