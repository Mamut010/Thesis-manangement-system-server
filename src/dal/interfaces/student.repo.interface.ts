import { StudentUpdateRequest } from "../../contracts/requests/api/student-update.request";
import { StudentsQueryRequest } from "../../contracts/requests/api/students-query.request";
import { StudentsQueryResponse } from "../../contracts/responses/api/students-query.response";
import { StudentInfoDto } from "../../shared/dtos";

export interface StudentRepoInterface {
    query(queryRequest: StudentsQueryRequest): Promise<StudentsQueryResponse>;
    findOneById(id: string): Promise<StudentInfoDto | null>;
    update(id: string, updateRequest: StudentUpdateRequest): Promise<StudentInfoDto | null>;
}