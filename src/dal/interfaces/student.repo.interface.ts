import { StudentUpdateRequest, StudentsQueryRequest } from "../../contracts/requests";
import { StudentsQueryResponse } from "../../contracts/responses";
import { StudentDto } from "../../shared/dtos";

export interface StudentRepoInterface {
    query(queryRequest: StudentsQueryRequest): Promise<StudentsQueryResponse>;
    findOneById(id: string): Promise<StudentDto | null>;
    update(id: string, updateRequest: StudentUpdateRequest): Promise<StudentDto | null>;
}