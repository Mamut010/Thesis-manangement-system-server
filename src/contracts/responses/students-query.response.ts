import { Type } from "class-transformer";
import { StudentInfoDto } from "../../shared/dtos";
import { BaseQueryResponse } from "./base-query.response";

export class StudentsQueryResponse extends BaseQueryResponse<StudentInfoDto> {
    @Type(() => StudentInfoDto)
    content!: StudentInfoDto[];
}