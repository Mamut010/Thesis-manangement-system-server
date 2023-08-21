import { ThesisCreateRequest } from "../../contracts/requests/resources/thesis-create.request";
import { ThesisUpdateRequest } from "../../contracts/requests/resources/thesis-update.request";
import { ThesesQueryRequest } from "../../contracts/requests/resources/theses-query.request";
import { ThesesQueryResponse } from "../../contracts/responses/resources/theses-query.response";
import { ThesisDto } from "../../shared/dtos";

export interface ThesisRepoInterface {
    query(queryRequest: ThesesQueryRequest): Promise<ThesesQueryResponse>;

    findOneById(id: number): Promise<ThesisDto | null>;

    create(createRequest: ThesisCreateRequest): Promise<ThesisDto>;

    update(id: number, updateRequest: ThesisUpdateRequest): Promise<ThesisDto | null>;

    delete(id: number): Promise<boolean>;
}