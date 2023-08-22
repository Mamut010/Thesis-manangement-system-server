import { Expose, Type } from "class-transformer";
import { StudentInfoDto } from "../../../shared/dtos";
import { IsDefined, ValidateNested } from "class-validator";
import { QueryResponse } from "../../interfaces";
import { BaseQueryResponse } from "../../bases";

export class StudentsQueryResponse extends BaseQueryResponse implements QueryResponse<StudentInfoDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => StudentInfoDto)
    content!: StudentInfoDto[];
}