import { StudentInfosQueryRequest } from "../../contracts/requests";
import { StudentInfosQueryResponse } from "../../contracts/responses";
import { StudentMaintainerServiceInterface } from "./student-maintainer.service.interface";

export interface AdminStudentServiceInterface extends StudentMaintainerServiceInterface {
    getStudents(studentsQuery: StudentInfosQueryRequest): Promise<StudentInfosQueryResponse>;
}