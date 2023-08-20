import { LecturerUpdateRequest } from "../../contracts/requests/lecturer-update.request";
import { LecturersQueryRequest } from "../../contracts/requests/lecturers-query.request";
import { LecturersQueryResponse } from "../../contracts/responses/lecturers-query.response";
import { LecturerInfoDto } from "../dtos";

export interface LecturerRepoInterface {
    getLecturers(queryRequest: LecturersQueryRequest): Promise<LecturersQueryResponse>;
    getLecturerInfo(id: number): Promise<LecturerInfoDto>;
    updateLecturer(id: number, updateRequest: LecturerUpdateRequest): Promise<LecturerInfoDto>;
}