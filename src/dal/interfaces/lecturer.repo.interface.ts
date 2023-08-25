import { LecturerUpdateRequest, LecturersQueryRequest } from "../../contracts/requests";
import { LecturersQueryResponse } from "../../contracts/responses";
import { LecturerDto } from "../../shared/dtos";

export interface LecturerRepoInterface {
    query(queryRequest: LecturersQueryRequest): Promise<LecturersQueryResponse>;
    findOneById(id: string): Promise<LecturerDto | null>;
    update(id: string, updateRequest: LecturerUpdateRequest): Promise<LecturerDto | null>;
}