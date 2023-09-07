import { LecturerInfosQueryRequest } from "../../contracts/requests";
import { LecturerInfosQueryResponse } from "../../contracts/responses";
import { LecturerMaintainerServiceInterface } from "./lecturer-maintainer.service.interface";

export interface AdminLecturerServiceInterface extends LecturerMaintainerServiceInterface {
    getLecturers(lecturersQuery: LecturerInfosQueryRequest): Promise<LecturerInfosQueryResponse>;
}