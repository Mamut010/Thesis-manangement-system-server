import { Expose, Type } from "class-transformer";
import { LecturerDto } from "../../../shared/dtos";
import { IsDefined, ValidateNested } from "class-validator";
import { QueryResponse } from "../../interfaces";
import { BaseQueryResponse } from "../../bases";

export class LecturersQueryResponse extends BaseQueryResponse implements QueryResponse<LecturerDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => LecturerDto)
    content!: LecturerDto[];
}