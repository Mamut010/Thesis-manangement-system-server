import { Expose, Type } from "class-transformer";
import { StudentDto } from "../../../shared/dtos";
import { IsDefined, ValidateNested } from "class-validator";
import { QueryResponse } from "../../interfaces";
import { BaseQueryResponse } from "../../bases";

export class StudentsQueryResponse extends BaseQueryResponse implements QueryResponse<StudentDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => StudentDto)
    content!: StudentDto[];
}