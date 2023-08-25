import { ProgramCreateRequest, ProgramUpdateRequest, ProgramsQueryRequest } from "../../contracts/requests";
import { ProgramsQueryResponse } from "../../contracts/responses";
import { ProgramDto } from "../../shared/dtos";

export interface ProgramRepoInterface {
    query(queryRequest: ProgramsQueryRequest): Promise<ProgramsQueryResponse>;

    findOneById(id: number): Promise<ProgramDto | null>;

    create(createRequest: ProgramCreateRequest): Promise<ProgramDto>;

    update(id: number, updateRequest: ProgramUpdateRequest): Promise<ProgramDto | null>;

    delete(id: number): Promise<boolean>;
}