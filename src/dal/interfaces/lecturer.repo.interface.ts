import { LecturerUpdateRequest } from "../../contracts/requests/lecturer-update.request";
import { LecturersQueryRequest } from "../../contracts/requests/lecturers-query.request";
import { LecturersQueryResponse } from "../../contracts/responses/lecturers-query.response";
import { LecturerDto } from "../../shared/dtos";

export interface LecturerRepoInterface {
    query(queryRequest: LecturersQueryRequest): Promise<LecturersQueryResponse>;
    findOneById(id: string): Promise<LecturerDto | null>;
    update(id: string, updateRequest: LecturerUpdateRequest): Promise<LecturerDto | null>;
}