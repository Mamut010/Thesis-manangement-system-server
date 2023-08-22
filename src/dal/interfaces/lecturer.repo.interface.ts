import { LecturerUpdateRequest } from "../../contracts/requests/api/lecturer-update.request";
import { LecturersQueryRequest } from "../../contracts/requests/api/lecturers-query.request";
import { LecturersQueryResponse } from "../../contracts/responses/api/lecturers-query.response";
import { LecturerInfoDto } from "../../shared/dtos";

export interface LecturerRepoInterface {
    query(queryRequest: LecturersQueryRequest): Promise<LecturersQueryResponse>;
    findOneById(id: string): Promise<LecturerInfoDto | null>;
    update(id: string, updateRequest: LecturerUpdateRequest): Promise<LecturerInfoDto | null>;
}