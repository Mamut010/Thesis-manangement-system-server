import { FieldCreateRequest } from "../../contracts/requests";
import { FieldUpdateRequest } from "../../contracts/requests";
import { FieldsQueryRequest } from "../../contracts/requests";
import { FieldsQueryResponse } from "../../contracts/responses";
import { FieldDto } from "../../shared/dtos";

export interface FieldRepoInterface {
    query(queryRequest: FieldsQueryRequest): Promise<FieldsQueryResponse>;

    findOneById(id: number): Promise<FieldDto | null>;

    create(createRequest: FieldCreateRequest): Promise<FieldDto>;

    update(id: number, updateRequest: FieldUpdateRequest): Promise<FieldDto | null>;

    delete(id: number): Promise<boolean>;
}