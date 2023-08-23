import { ThesisCreateRequest, ThesisUpdateRequest, ThesesQueryRequest } from "../../contracts/requests";
import { ThesesQueryResponse } from "../../contracts/responses";
import { ThesisDto } from "../../shared/dtos";

export interface ThesisRepoInterface {
    query(queryRequest: ThesesQueryRequest): Promise<ThesesQueryResponse>;

    findOneById(id: number): Promise<ThesisDto | null>;

    create(createRequest: ThesisCreateRequest): Promise<ThesisDto>;

    update(id: number, updateRequest: ThesisUpdateRequest): Promise<ThesisDto | null>;

    delete(id: number): Promise<boolean>;
}