import { StudentUpdateRequest } from "../../contracts/requests/student-update.request";
import { StudentsQueryRequest } from "../../contracts/requests/students-query.request";
import { StudentsQueryResponse } from "../../contracts/responses/students-query.response";
import { StudentInfoDto } from "../../shared/dtos";

export interface StudentRepoInterface {
    query(queryRequest: StudentsQueryRequest): Promise<StudentsQueryResponse>;
    findOneById(id: string): Promise<StudentInfoDto | null>;
    update(id: string, updateRequest: StudentUpdateRequest): Promise<StudentInfoDto | null>;
}