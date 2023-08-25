import { Expose, Type } from "class-transformer";
import { ProgramDto } from "../../../shared/dtos";
import { QueryResponse } from "../../interfaces";
import { IsDefined, ValidateNested } from "class-validator";
import { BaseQueryResponse } from "../../bases";

export class ProgramsQueryResponse extends BaseQueryResponse implements QueryResponse<ProgramDto> {
    @Expose()
    @IsDefined()
    @ValidateNested({ each: true })
    @Type(() => ProgramDto)
    content!: ProgramDto[];
}